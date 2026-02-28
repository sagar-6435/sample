from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import io
import numpy as np
from typing import List, Dict
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="LifeLink ML Service", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variable for model (will be loaded on startup)
model = None

# Medicine database (replace with actual database connection)
MEDICINE_DATABASE = {
    "paracetamol": {
        "name": "Paracetamol 500mg",
        "type": "Pain Relief • Tablet",
        "dosage": "1 tab / 6 hrs",
        "category": "Analgesic",
        "prices": [
            {"shop": "MediCare Plus", "price": 5.99, "available": True},
            {"shop": "HealthMart", "price": 6.50, "available": True},
        ],
        "sideEffects": ["Nausea", "Allergic reactions (rare)"],
        "warnings": ["Do not exceed 4g per day", "Avoid with alcohol"]
    },
    "amoxicillin": {
        "name": "Amoxicillin 500mg",
        "type": "Antibiotic • Capsule Form",
        "dosage": "1 cap / 8 hrs",
        "category": "Antibiotic",
        "prices": [
            {"shop": "MediCare Plus", "price": 12.50, "available": True},
            {"shop": "Life Pharma", "price": 14.20, "available": True},
        ],
        "sideEffects": ["Diarrhea", "Nausea", "Skin rash"],
        "warnings": ["Complete full course", "Take with food"]
    },
    "ibuprofen": {
        "name": "Ibuprofen 400mg",
        "type": "Anti-inflammatory • Tablet",
        "dosage": "1 tab / 8 hrs",
        "category": "NSAID",
        "prices": [
            {"shop": "CityPharmacy", "price": 8.75, "available": True},
            {"shop": "MediCare Plus", "price": 9.20, "available": True},
        ],
        "sideEffects": ["Stomach upset", "Heartburn"],
        "warnings": ["Take with food", "Avoid if pregnant"]
    },
    "aspirin": {
        "name": "Aspirin 75mg",
        "type": "Blood Thinner • Tablet",
        "dosage": "1 tab / day",
        "category": "Antiplatelet",
        "prices": [
            {"shop": "HealthMart", "price": 4.99, "available": True},
        ],
        "sideEffects": ["Bleeding risk", "Stomach irritation"],
        "warnings": ["Do not stop suddenly", "Consult doctor before use"]
    }
}


def load_model():
    """
    Load your trained model here.
    Replace this with your actual model loading code.
    """
    # Example for TensorFlow:
    # from tensorflow import keras
    # model = keras.models.load_model('models/medicine_classifier.h5')
    
    # Example for PyTorch:
    # import torch
    # model = torch.load('models/medicine_classifier.pth')
    # model.eval()
    
    print("Model loading placeholder - replace with actual model")
    return None


def preprocess_image(image: Image.Image) -> np.ndarray:
    """
    Preprocess the image for model inference.
    Adjust this based on your model's requirements.
    """
    # Resize image to model input size (e.g., 224x224)
    image = image.resize((224, 224))
    
    # Convert to RGB if needed
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Convert to numpy array
    img_array = np.array(image)
    
    # Normalize pixel values (adjust based on your model)
    img_array = img_array / 255.0
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array


def predict_medicine(image_array: np.ndarray) -> Dict:
    """
    Run inference on the preprocessed image.
    Replace this with your actual model prediction code.
    """
    # TODO: Replace with actual model inference
    # predictions = model.predict(image_array)
    # predicted_class = np.argmax(predictions[0])
    # confidence = float(predictions[0][predicted_class])
    
    # Mock prediction for now
    import random
    medicine_keys = list(MEDICINE_DATABASE.keys())
    predicted_medicine = random.choice(medicine_keys)
    confidence = random.uniform(0.85, 0.99)
    
    return {
        "medicine_id": predicted_medicine,
        "confidence": confidence
    }


@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    global model
    model = load_model()
    print("✓ ML Service started successfully")


@app.get("/")
async def root():
    return {
        "service": "LifeLink ML Service",
        "status": "running",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }


@app.post("/api/detect")
async def detect_medicine(file: UploadFile = File(...)):
    """
    Detect medicine from uploaded image.
    
    Args:
        file: Image file (JPEG, PNG)
    
    Returns:
        Detected medicine information with confidence score
    """
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read and process image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Preprocess image
        processed_image = preprocess_image(image)
        
        # Run prediction
        prediction = predict_medicine(processed_image)
        
        # Get medicine details from database
        medicine_id = prediction["medicine_id"]
        confidence = prediction["confidence"]
        
        if medicine_id not in MEDICINE_DATABASE:
            raise HTTPException(status_code=404, detail="Medicine not found in database")
        
        medicine_info = MEDICINE_DATABASE[medicine_id]
        
        return {
            "success": True,
            "confidence": round(confidence, 2),
            "detected": {
                "id": medicine_id,
                **medicine_info
            },
            "message": f"Detected with {round(confidence * 100, 1)}% confidence"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")


@app.post("/api/detect-batch")
async def detect_medicine_batch(files: List[UploadFile] = File(...)):
    """
    Detect medicines from multiple images.
    
    Args:
        files: List of image files
    
    Returns:
        List of detected medicines
    """
    results = []
    
    for file in files:
        try:
            contents = await file.read()
            image = Image.open(io.BytesIO(contents))
            processed_image = preprocess_image(image)
            prediction = predict_medicine(processed_image)
            
            medicine_id = prediction["medicine_id"]
            medicine_info = MEDICINE_DATABASE.get(medicine_id, {})
            
            results.append({
                "filename": file.filename,
                "success": True,
                "confidence": round(prediction["confidence"], 2),
                "detected": {
                    "id": medicine_id,
                    **medicine_info
                }
            })
        except Exception as e:
            results.append({
                "filename": file.filename,
                "success": False,
                "error": str(e)
            })
    
    return {"results": results}


@app.get("/api/medicines")
async def get_all_medicines():
    """Get all medicines in the database"""
    return {
        "medicines": [
            {"id": key, **value}
            for key, value in MEDICINE_DATABASE.items()
        ]
    }


@app.get("/api/medicines/{medicine_id}")
async def get_medicine(medicine_id: str):
    """Get specific medicine details"""
    if medicine_id not in MEDICINE_DATABASE:
        raise HTTPException(status_code=404, detail="Medicine not found")
    
    return {
        "id": medicine_id,
        **MEDICINE_DATABASE[medicine_id]
    }


@app.post("/api/analyze-dosage")
async def analyze_dosage(
    medicine_id: str,
    patient_age: int,
    patient_weight: float = None
):
    """
    Analyze appropriate dosage based on patient information.
    This is a placeholder - implement actual dosage calculation logic.
    """
    if medicine_id not in MEDICINE_DATABASE:
        raise HTTPException(status_code=404, detail="Medicine not found")
    
    medicine = MEDICINE_DATABASE[medicine_id]
    
    # TODO: Implement actual dosage calculation based on age, weight, etc.
    dosage_recommendation = medicine["dosage"]
    
    # Adjust for children (simplified example)
    if patient_age < 12:
        dosage_recommendation = "Consult pediatrician for child dosage"
    
    return {
        "medicine": medicine["name"],
        "patient_age": patient_age,
        "recommended_dosage": dosage_recommendation,
        "warnings": medicine.get("warnings", []),
        "note": "Always consult a healthcare professional before taking medication"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
