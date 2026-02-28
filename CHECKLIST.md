# LifeLink Development Checklist

Use this checklist to ensure everything is set up correctly.

## Initial Setup

### Prerequisites
- [ ] Node.js 18+ installed (`node --version`)
- [ ] Python 3.11+ installed (`python --version`)
- [ ] MongoDB 7.0+ installed
- [ ] Git installed
- [ ] (Optional) Docker installed

### Repository
- [ ] Repository cloned
- [ ] All folders present (mobile, backend, ml-service)

## Backend Setup

- [ ] Navigate to `backend/` folder
- [ ] Run `npm install`
- [ ] Create `.env` file from `.env.example`
- [ ] Update MongoDB URI in `.env`
- [ ] Update JWT secret in `.env`
- [ ] Update ML service URL in `.env`
- [ ] MongoDB is running
- [ ] Run `node seed.js` (optional)
- [ ] Run `npm run dev`
- [ ] Backend accessible at `http://localhost:3000`
- [ ] Test: `curl http://localhost:3000/health`

## ML Service Setup

- [ ] Navigate to `ml-service/` folder
- [ ] Create virtual environment (`python -m venv venv`)
- [ ] Activate virtual environment
- [ ] Run `pip install -r requirements.txt`
- [ ] Create `.env` file from `.env.example`
- [ ] Create `models/` directory
- [ ] Place trained model in `models/` folder
- [ ] Update `load_model()` function in `main.py`
- [ ] Update `predict_medicine()` function in `main.py`
- [ ] Update `class_to_medicine` mapping
- [ ] Update `MEDICINE_DATABASE` with your medicines
- [ ] Run `python main.py`
- [ ] ML service accessible at `http://localhost:8000`
- [ ] Test: `curl http://localhost:8000/health`
- [ ] Check API docs: `http://localhost:8000/docs`

## Mobile App Setup

- [ ] Navigate to `mobile/` folder
- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] Expo DevTools opens in browser
- [ ] Scan QR code with Expo Go app
- [ ] App loads successfully

## Integration Testing

### Backend ↔ MongoDB
- [ ] Backend connects to MongoDB
- [ ] Seed data loads successfully
- [ ] Can query doctors: `curl http://localhost:3000/api/doctors`
- [ ] Can query hospitals: `curl http://localhost:3000/api/hospitals`

### Backend ↔ ML Service
- [ ] Backend can reach ML service
- [ ] Test: `curl http://localhost:3000/api/medicines/ml-health`
- [ ] Medicine detection endpoint works

### Mobile ↔ Backend
- [ ] Mobile app can load doctors list
- [ ] Mobile app can load hospitals list
- [ ] Authentication works
- [ ] Navigation works

### Mobile ↔ ML Service (via Backend)
- [ ] Medicine detection screen opens
- [ ] Camera permission granted
- [ ] Can take photo
- [ ] Can select from gallery
- [ ] Image uploads successfully
- [ ] Detection result displays
- [ ] Medicine info shows correctly

## Model Integration

- [ ] Model file exists in `ml-service/models/`
- [ ] Model loads without errors
- [ ] Preprocessing matches training
- [ ] Class mapping is correct
- [ ] Predictions return valid medicine IDs
- [ ] Confidence scores are reasonable (0-1)
- [ ] Medicine database has all classes
- [ ] Test with sample images

## Docker Setup (Optional)

- [ ] Docker installed
- [ ] Docker Compose installed
- [ ] Run `docker-compose build`
- [ ] Run `docker-compose up -d`
- [ ] All containers running: `docker-compose ps`
- [ ] MongoDB container healthy
- [ ] Backend container healthy
- [ ] ML service container healthy
- [ ] Can access all services

## Production Readiness

### Security
- [ ] Change JWT secret in production
- [ ] Update CORS origins
- [ ] Add rate limiting
- [ ] Add authentication middleware
- [ ] Validate all inputs
- [ ] Sanitize file uploads
- [ ] Use HTTPS

### Performance
- [ ] Enable GPU for ML service (if available)
- [ ] Add caching for frequent queries
- [ ] Optimize database queries
- [ ] Add indexes to MongoDB
- [ ] Compress API responses
- [ ] Optimize images

### Monitoring
- [ ] Add logging
- [ ] Set up error tracking
- [ ] Monitor API response times
- [ ] Monitor ML inference times
- [ ] Set up health checks
- [ ] Add metrics collection

### Deployment
- [ ] Backend deployed
- [ ] ML service deployed
- [ ] MongoDB hosted (Atlas, etc.)
- [ ] Mobile app built
- [ ] Mobile app published (Play Store/App Store)
- [ ] Domain configured
- [ ] SSL certificates installed

## Testing Checklist

### Backend API
- [ ] Health check works
- [ ] Authentication works
- [ ] Doctor search works
- [ ] Hospital search works
- [ ] Appointment booking works
- [ ] Ambulance tracking works
- [ ] Medicine detection proxy works
- [ ] Error handling works

### ML Service
- [ ] Health check works
- [ ] Single image detection works
- [ ] Batch detection works
- [ ] Dosage analysis works
- [ ] Error handling works
- [ ] Invalid image handling works
- [ ] Large file handling works

### Mobile App
- [ ] Splash screen displays
- [ ] Authentication flow works
- [ ] Patient dashboard loads
- [ ] Doctor dashboard loads (if applicable)
- [ ] Hospital dashboard loads (if applicable)
- [ ] Doctor search works
- [ ] Hospital search works
- [ ] Appointment booking works
- [ ] Medicine detection works
- [ ] Camera works
- [ ] Gallery picker works
- [ ] Ambulance tracking works
- [ ] Profile screen works
- [ ] Navigation works
- [ ] Logout works

## Common Issues

### MongoDB Connection Failed
- [ ] MongoDB is running
- [ ] Connection string is correct
- [ ] Network allows connection
- [ ] Database exists

### ML Service Not Loading Model
- [ ] Model file exists
- [ ] Model path is correct
- [ ] TensorFlow/PyTorch installed
- [ ] Python version compatible
- [ ] Sufficient memory available

### Backend Can't Reach ML Service
- [ ] ML service is running
- [ ] ML_SERVICE_URL is correct
- [ ] Port 8000 is not blocked
- [ ] No firewall issues

### Mobile App Not Connecting
- [ ] Backend is running
- [ ] API URL is correct
- [ ] Network connection works
- [ ] CORS is configured

## Next Steps

After completing this checklist:

1. **Test thoroughly** - Try all features
2. **Optimize** - Improve performance
3. **Secure** - Add authentication, validation
4. **Monitor** - Set up logging and metrics
5. **Deploy** - Move to production
6. **Maintain** - Keep dependencies updated

## Notes

Add any project-specific notes here:

- Model accuracy: ____%
- Supported medicines: ____
- Known issues: ____
- Future improvements: ____
