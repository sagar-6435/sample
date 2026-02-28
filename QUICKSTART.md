# LifeLink Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+
- Python 3.11+
- MongoDB running

## Step 1: Install Dependencies (2 minutes)

```bash
# Backend
cd backend
npm install
cd ..

# ML Service
cd ml-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..

# Mobile
cd mobile
npm install
cd ..
```

## Step 2: Configure Environment (1 minute)

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env if needed (defaults work for local development)
cd ..

# ML Service
cd ml-service
cp .env.example .env
cd ..
```

## Step 3: Start Services (1 minute)

### Option A: Automated (Easiest)

**Windows:**
```bash
start-dev.bat
```

**Linux/Mac:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Option B: Docker (Recommended)

```bash
docker-compose up -d
```

### Option C: Manual

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: ML Service
cd ml-service
python main.py

# Terminal 3: Mobile
cd mobile
npm start
```

## Step 4: Test (1 minute)

### Check Services

```bash
# Backend
curl http://localhost:3000/health

# ML Service
curl http://localhost:8000/health
```

### Open Mobile App

1. Scan QR code with Expo Go app
2. App should load successfully
3. Try logging in with any email

## Step 5: Integrate Your Model (Optional)

1. Place your model in `ml-service/models/`
2. Update `ml-service/main.py`:
   - `load_model()` function
   - `predict_medicine()` function
3. Restart ML service

See `ml-service/INTEGRATION.md` for details.

## Verify Everything Works

### Backend API
```bash
# Get doctors
curl http://localhost:3000/api/doctors

# Get hospitals
curl http://localhost:3000/api/hospitals
```

### ML Service
```bash
# Check API docs
open http://localhost:8000/docs

# Test detection (with image)
curl -X POST http://localhost:8000/api/detect \
  -F "file=@test_image.jpg"
```

### Mobile App
1. Open app on phone
2. Login with any email
3. Browse doctors
4. Try medicine detection

## Troubleshooting

### MongoDB Not Running
```bash
# Start MongoDB
mongod --dbpath /path/to/data
```

### Port Already in Use
```bash
# Change ports in .env files
# Backend: PORT=3001
# ML Service: PORT=8001
```

### ML Service Can't Load Model
```bash
# Check model exists
ls ml-service/models/

# Check Python version
python --version  # Should be 3.11+
```

## Next Steps

1. ✅ Services running
2. 📖 Read `PROJECT_OVERVIEW.md` for architecture
3. 🔧 Integrate your trained model
4. 🧪 Test all features
5. 🚀 Deploy to production

## Useful Commands

```bash
# Seed database with sample data
cd backend && node seed.js

# View Docker logs
docker-compose logs -f

# Stop Docker services
docker-compose down

# Rebuild Docker images
docker-compose build
```

## Documentation

- **Complete Setup**: `SETUP.md`
- **Project Overview**: `PROJECT_OVERVIEW.md`
- **Development Checklist**: `CHECKLIST.md`
- **API Documentation**: `backend/README.md`
- **Model Integration**: `ml-service/INTEGRATION.md`

## Support

Having issues? Check:
1. MongoDB is running
2. All dependencies installed
3. Ports 3000, 8000 are free
4. Environment files configured

---

**That's it! You're ready to develop. 🎉**
