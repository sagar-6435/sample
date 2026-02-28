# LifeLink ML Service - Medicine Detection API

FastAPI service for AI-powered medicine detection using computer vision.

## Features

- Image-based medicine detection
- Batch processing support
- Dosage recommendations based on patient info
- Medicine database with pricing and availability
- RESTful API with automatic documentation

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Place your trained model in the `models/` directory

5. Update `load_model()` function in `main.py` with your model loading code

## Running the Service

Development mode:
```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Health Check
```
GET /health
```

### Detect Medicine
```
POST /api/detect
Content-Type: multipart/form-data

Body:
- file: image file (JPEG, PNG)

Response:
{
  "success": true,
  "confidence": 0.95,
  "detected": {
    "id": "paracetamol",
    "name": "Paracetamol 500mg",
    "type": "Pain Relief • Tablet",
    "dosage": "1 tab / 6 hrs",
    "prices": [...],
    "sideEffects": [...],
    "warnings": [...]
  }
}
```

### Batch Detection
```
POST /api/detect-batch
Content-Type: multipart/form-data

Body:
- files: multiple image files

Response:
{
  "results": [...]
}
```

### Get All Medicines
```
GET /api/medicines
```

### Get Medicine Details
```
GET /api/medicines/{medicine_id}
```

### Analyze Dosage
```
POST /api/analyze-dosage
Content-Type: application/json

Body:
{
  "medicine_id": "paracetamol",
  "patient_age": 28,
  "patient_weight": 70.5
}
```

## Integrating Your Model

### For TensorFlow/Keras:

```python
def load_model():
    from tensorflow import keras
    model = keras.models.load_model('models/medicine_classifier.h5')
    return model

def predict_medicine(image_array: np.ndarray) -> Dict:
    predictions = model.predict(image_array)
    predicted_class = np.argmax(predictions[0])
    confidence = float(predictions[0][predicted_class])
    
    # Map class index to medicine ID
    class_to_medicine = {
        0: "paracetamol",
        1: "amoxicillin",
        2: "ibuprofen",
        # ... add your classes
    }
    
    return {
        "medicine_id": class_to_medicine[predicted_class],
        "confidence": confidence
    }
```

### For PyTorch:

```python
def load_model():
    import torch
    model = torch.load('models/medicine_classifier.pth')
    model.eval()
    return model

def predict_medicine(image_array: np.ndarray) -> Dict:
    import torch
    
    # Convert to tensor
    image_tensor = torch.from_numpy(image_array).float()
    image_tensor = image_tensor.permute(0, 3, 1, 2)  # NHWC to NCHW
    
    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = torch.nn.functional.softmax(outputs, dim=1)
        confidence, predicted = torch.max(probabilities, 1)
    
    class_to_medicine = {
        0: "paracetamol",
        1: "amoxicillin",
        # ... add your classes
    }
    
    return {
        "medicine_id": class_to_medicine[predicted.item()],
        "confidence": confidence.item()
    }
```

## Connecting to Node.js Backend

Update your Node.js backend to call this service:

```javascript
// backend/routes/medicines.js
const axios = require('axios');

router.post('/detect', async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('file', req.file.buffer, req.file.originalname);
    
    const response = await axios.post(
      'http://localhost:8000/api/detect',
      formData,
      { headers: formData.getHeaders() }
    );
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Model Requirements

Your model should:
- Accept images of size 224x224 (or update `preprocess_image()`)
- Output class probabilities
- Be trained on medicine images with clear labels

## Production Deployment

For production:
1. Use gunicorn with multiple workers:
```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

2. Set up proper CORS origins in production
3. Add authentication/API keys
4. Use a reverse proxy (nginx)
5. Enable HTTPS
6. Add rate limiting
7. Monitor with logging and metrics

## Testing

Test the API with curl:
```bash
curl -X POST "http://localhost:8000/api/detect" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@medicine_image.jpg"
```

## Tech Stack

- FastAPI - Modern Python web framework
- Uvicorn - ASGI server
- Pillow - Image processing
- NumPy - Array operations
- TensorFlow/PyTorch - Deep learning (choose one)
