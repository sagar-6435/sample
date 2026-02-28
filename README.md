# LifeLink - AI-Powered Healthcare Platform

A comprehensive healthcare application with React Native mobile app and Node.js backend API.

## Architecture

```
┌─────────────────┐
│  Mobile App     │
│  (React Native) │
└────────┬────────┘
         │
         ├──────────────────┐
         │                  │
         ▼                  ▼
┌─────────────────┐  ┌──────────────────┐
│  Backend API    │  │   ML Service     │
│  (Node/Express) │◄─┤   (FastAPI)      │
└────────┬────────┘  └──────────────────┘
         │                  │
         ▼                  ▼
┌─────────────────┐  ┌──────────────────┐
│    MongoDB      │  │  Trained Model   │
│   (Database)    │  │  (TF/PyTorch)    │
└─────────────────┘  └──────────────────┘
```

## Project Structure

```
lifelink-app/
├── mobile/          # React Native mobile app (Expo)
├── backend/         # Node.js/Express API server
├── ml-service/      # FastAPI ML service for medicine detection
└── client/          # (Reserved for web client)
```

## Features

### Patient Features
- Doctor search and booking with AI recommendations
- Nearby hospital finder with real-time availability
- Emergency ambulance tracking
- AI-powered medicine detection and price comparison
- Medical reports management with AI analysis
- Appointment scheduling with payment integration

### Doctor Features
- Patient management dashboard
- Schedule management
- Digital prescription uploads
- Emergency duty status toggle
- Appointment notifications

### Hospital Features
- Fleet management for ambulances
- Blood bank inventory tracking
- Offline booking management
- Facility showcase gallery
- Real-time dispatch monitoring

## Getting Started

**New to the project?** Start here: [QUICKSTART.md](QUICKSTART.md) (5 minutes)

**Detailed setup?** See [SETUP.md](SETUP.md) for complete instructions.

### Quick Start

**Windows:**
```bash
start-dev.bat
```

**Linux/Mac:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Docker (All Platforms):**
```bash
docker-compose up -d
```

This starts:
- MongoDB on port 27017
- Backend API on port 3000
- ML Service on port 8000

Then start the mobile app:
```bash
cd mobile
npm install
npm start
```

## Tech Stack

### Mobile
- React Native
- Expo
- React Navigation
- Expo Camera & Image Picker

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Geospatial queries for location-based features
- Multer for file uploads
- Axios for ML service integration

### ML Service
- FastAPI
- Python 3.11
- TensorFlow/PyTorch (for your trained model)
- Pillow for image processing
- Uvicorn ASGI server

## API Documentation

- Backend API: See [backend/README.md](backend/README.md)
- ML Service: `http://localhost:8000/docs` (Swagger UI)
- Complete Setup: See [SETUP.md](SETUP.md)

## Integrating Your Model

1. Place your trained model in `ml-service/models/`
2. Update `load_model()` and `predict_medicine()` in `ml-service/main.py`
3. See [ml-service/INTEGRATION.md](ml-service/INTEGRATION.md) for detailed guide

## License

MIT
