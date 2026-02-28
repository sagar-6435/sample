# LifeLink Setup Guide

Complete guide to set up and run the LifeLink healthcare platform.

## Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- MongoDB 7.0+
- Git
- (Optional) Docker and Docker Compose

## Quick Start

### Option 1: Automated Setup (Recommended)

#### Windows
```bash
start-dev.bat
```

#### Linux/Mac
```bash
chmod +x start-dev.sh
./start-dev.sh
```

#### Docker (All Platforms)
```bash
docker-compose up -d
```

### Option 2: Manual Setup

#### 1. Clone Repository
```bash
git clone <repository-url>
cd lifelink-app
```

#### 2. Setup MongoDB

**Install MongoDB:**
- Windows: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Mac: `brew install mongodb-community`
- Linux: Follow [official guide](https://docs.mongodb.com/manual/installation/)

**Start MongoDB:**
```bash
# Windows
mongod --dbpath C:\data\db

# Mac/Linux
mongod --dbpath /usr/local/var/mongodb
```

#### 3. Setup Backend API

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your settings
# MONGODB_URI=mongodb://localhost:27017/lifelink
# JWT_SECRET=your_secret_key
# ML_SERVICE_URL=http://localhost:8000

# Seed database (optional)
node seed.js

# Start server
npm run dev
```

Backend will run on `http://localhost:3000`

#### 4. Setup ML Service

```bash
cd ml-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Place your trained model in models/ directory
# See INTEGRATION.md for details

# Start service
python main.py
```

ML Service will run on `http://localhost:8000`

#### 5. Setup Mobile App

```bash
cd mobile

# Install dependencies
npm install

# Start Expo
npm start

# Run on device
npm run android  # For Android
npm run ios      # For iOS (Mac only)
```

## Integrating Your Trained Model

### Step 1: Prepare Model
Place your trained model in `ml-service/models/`:
- TensorFlow: `medicine_classifier.h5`
- PyTorch: `medicine_classifier.pth`

### Step 2: Update Code

Edit `ml-service/main.py`:

**For TensorFlow:**
```python
def load_model():
    from tensorflow import keras
    model = keras.models.load_model('models/medicine_classifier.h5')
    return model

def predict_medicine(image_array: np.ndarray) -> Dict:
    predictions = model.predict(image_array)
    predicted_class = np.argmax(predictions[0])
    confidence = float(predictions[0][predicted_class])
    
    class_to_medicine = {
        0: "paracetamol",
        1: "amoxicillin",
        # Add your classes
    }
    
    return {
        "medicine_id": class_to_medicine[predicted_class],
        "confidence": confidence
    }
```

**For PyTorch:**
```python
def load_model():
    import torch
    model = torch.load('models/medicine_classifier.pth')
    model.eval()
    return model

def predict_medicine(image_array: np.ndarray) -> Dict:
    import torch
    import torch.nn.functional as F
    
    image_tensor = torch.from_numpy(image_array).float()
    image_tensor = image_tensor.permute(0, 3, 1, 2)
    
    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = F.softmax(outputs, dim=1)
        confidence, predicted = torch.max(probabilities, 1)
    
    class_to_medicine = {
        0: "paracetamol",
        1: "amoxicillin",
        # Add your classes
    }
    
    return {
        "medicine_id": class_to_medicine[predicted.item()],
        "confidence": confidence.item()
    }
```

### Step 3: Test Integration
```bash
# Test ML service
curl -X POST "http://localhost:8000/api/detect" \
  -F "file=@test_image.jpg"

# Check health
curl http://localhost:8000/health
```

## Docker Deployment

### Build and Run
```bash
# Build all services
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Services
- MongoDB: `localhost:27017`
- Backend API: `http://localhost:3000`
- ML Service: `http://localhost:8000`

## Testing

### Backend API
```bash
cd backend

# Health check
curl http://localhost:3000/health

# Test authentication
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","role":"patient"}'
```

### ML Service
```bash
# Health check
curl http://localhost:8000/health

# API documentation
open http://localhost:8000/docs
```

### Mobile App
1. Open Expo Go app on your phone
2. Scan QR code from terminal
3. Test medicine detection feature

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Windows:
tasklist | findstr mongod

# Mac/Linux:
ps aux | grep mongod

# Start MongoDB if not running
mongod --dbpath /path/to/data
```

### ML Service Not Loading Model
```bash
# Check model file exists
ls ml-service/models/

# Check Python version
python --version  # Should be 3.11+

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Backend Can't Connect to ML Service
```bash
# Check ML service is running
curl http://localhost:8000/health

# Check .env file
cat backend/.env | grep ML_SERVICE_URL
# Should be: ML_SERVICE_URL=http://localhost:8000
```

### Mobile App Build Errors
```bash
cd mobile

# Clear cache
npm start -- --clear

# Reinstall dependencies
rm -rf node_modules
npm install
```

## Environment Variables

### Backend (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/lifelink
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
ML_SERVICE_URL=http://localhost:8000
```

### ML Service (.env)
```env
PORT=8000
MODEL_PATH=models/medicine_classifier.h5
CONFIDENCE_THRESHOLD=0.7
MAX_FILE_SIZE=10485760
```

## API Endpoints

### Backend API (Port 3000)
- `GET /health` - Health check
- `POST /api/auth/login` - Login/Register
- `GET /api/doctors` - Get doctors
- `GET /api/hospitals` - Get hospitals
- `POST /api/appointments` - Book appointment
- `GET /api/ambulances/nearby` - Find ambulances
- `POST /api/medicines/detect` - Detect medicine (proxies to ML service)

### ML Service (Port 8000)
- `GET /health` - Health check
- `POST /api/detect` - Detect medicine from image
- `POST /api/detect-batch` - Batch detection
- `GET /api/medicines` - Get all medicines
- `POST /api/analyze-dosage` - Analyze dosage

## Production Deployment

### Backend
```bash
# Install production dependencies
npm ci --only=production

# Set environment
export NODE_ENV=production

# Start with PM2
npm install -g pm2
pm2 start server.js --name lifelink-backend
```

### ML Service
```bash
# Install gunicorn
pip install gunicorn

# Start with gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Mobile App
```bash
cd mobile

# Build for Android
eas build -p android --profile production

# Build for iOS
eas build -p ios --profile production
```

## Support

For issues and questions:
1. Check this guide
2. Review API documentation at `/docs`
3. Check logs: `docker-compose logs -f`
4. Open an issue on GitHub

## Next Steps

1. ✅ Set up all services
2. ✅ Integrate your trained model
3. ✅ Test medicine detection
4. 📱 Build mobile app
5. 🚀 Deploy to production
