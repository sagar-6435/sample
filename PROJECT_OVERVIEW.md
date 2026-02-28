# LifeLink Project Overview

## What is LifeLink?

LifeLink is an AI-powered healthcare platform that connects patients, doctors, and hospitals through a mobile application with intelligent features including medicine detection, ambulance tracking, and appointment booking.

## Project Structure

```
lifelink-app/
├── mobile/              # React Native mobile application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── screens/     # App screens (Patient, Doctor, Hospital dashboards)
│   │   └── utils/       # Utility functions
│   ├── assets/          # Images, fonts, etc.
│   └── App.js           # Main app entry point
│
├── backend/             # Node.js/Express REST API
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── server.js        # Server entry point
│   └── seed.js          # Database seeding script
│
├── ml-service/          # FastAPI ML service
│   ├── models/          # Trained ML models (you add these)
│   ├── main.py          # FastAPI application
│   └── requirements.txt # Python dependencies
│
├── client/              # (Reserved for future web client)
│
├── docker-compose.yml   # Docker orchestration
├── SETUP.md            # Detailed setup guide
├── CHECKLIST.md        # Development checklist
└── README.md           # Project documentation
```

## Key Features

### For Patients
- 🔍 **Smart Doctor Search** - Find doctors by specialty, location, rating
- 🏥 **Hospital Finder** - Locate nearby hospitals with real-time bed availability
- 📅 **Appointment Booking** - Schedule appointments with integrated payment
- 🚑 **Ambulance Tracking** - Real-time ambulance location and ETA
- 💊 **AI Medicine Detection** - Scan medicine labels to get info and prices
- 📊 **Medical Reports** - Store and manage medical records with AI analysis
- 🔔 **Smart Notifications** - AI-powered health reminders

### For Doctors
- 📋 **Patient Management** - View and manage patient appointments
- 📅 **Schedule Management** - Manage availability and appointments
- 🚨 **Emergency Duty** - Toggle emergency availability status
- 📝 **Digital Prescriptions** - Upload and manage prescriptions
- 📊 **Analytics Dashboard** - View patient statistics and trends

### For Hospitals
- 🚑 **Fleet Management** - Manage ambulance fleet and dispatch
- 🩸 **Blood Bank Inventory** - Track blood type availability
- 📦 **Inventory Management** - Manage medical supplies
- 📊 **Booking Management** - Handle offline and online bookings
- 🏢 **Facility Showcase** - Display hospital facilities and services

## Technology Stack

### Mobile App
- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **State Management**: React Hooks
- **UI**: Custom components with Material Icons
- **Camera**: Expo Camera & Image Picker

### Backend API
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **HTTP Client**: Axios (for ML service)

### ML Service
- **Framework**: FastAPI
- **Server**: Uvicorn (ASGI)
- **Image Processing**: Pillow
- **ML Framework**: TensorFlow or PyTorch (your choice)
- **API Docs**: Automatic Swagger/ReDoc

### Infrastructure
- **Database**: MongoDB 7.0
- **Containerization**: Docker & Docker Compose
- **Version Control**: Git

## Architecture Flow

### Medicine Detection Flow
```
1. User takes photo in mobile app
2. Image sent to Backend API (/api/medicines/detect)
3. Backend forwards to ML Service (/api/detect)
4. ML Service:
   - Preprocesses image
   - Runs model inference
   - Returns medicine info with confidence
5. Backend enriches data from database
6. Mobile app displays results with pricing
```

### Appointment Booking Flow
```
1. User searches for doctors
2. Backend queries MongoDB with filters
3. User selects doctor and time slot
4. User chooses payment method
5. Backend creates appointment record
6. Notifications sent to doctor and patient
```

### Ambulance Tracking Flow
```
1. User requests emergency ambulance
2. Backend finds nearest available ambulance (geospatial query)
3. Ambulance status updated to "dispatched"
4. Real-time location updates via WebSocket (future)
5. ETA calculated and displayed
6. Driver and patient can communicate
```

## API Endpoints Summary

### Backend API (Port 3000)

**Authentication**
- `POST /api/auth/login` - Login/Register
- `POST /api/auth/verify-otp` - Verify OTP

**Doctors**
- `GET /api/doctors` - List doctors (with filters)
- `GET /api/doctors/:id` - Get doctor details
- `PATCH /api/doctors/:id/availability` - Update availability

**Hospitals**
- `GET /api/hospitals` - List hospitals (with location)
- `GET /api/hospitals/:id` - Get hospital details
- `PATCH /api/hospitals/:id/blood-bank` - Update blood bank

**Appointments**
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/patient/:id` - Patient appointments
- `GET /api/appointments/doctor/:id` - Doctor appointments
- `PATCH /api/appointments/:id` - Update appointment

**Ambulances**
- `GET /api/ambulances/nearby` - Find nearby ambulances
- `POST /api/ambulances` - Register ambulance
- `PATCH /api/ambulances/:id/location` - Update location
- `PATCH /api/ambulances/:id/status` - Update status

**Medicines**
- `GET /api/medicines/search` - Search medicines
- `POST /api/medicines/detect` - AI detection (proxies to ML)
- `GET /api/medicines/suggestions` - Get suggestions

**Reports**
- `GET /api/reports/patient/:id` - Get patient reports
- `POST /api/reports` - Upload report
- `DELETE /api/reports/:id` - Delete report

### ML Service API (Port 8000)

- `GET /health` - Health check
- `POST /api/detect` - Detect medicine from image
- `POST /api/detect-batch` - Batch detection
- `GET /api/medicines` - List all medicines
- `GET /api/medicines/:id` - Get medicine details
- `POST /api/analyze-dosage` - Analyze dosage for patient

## Database Schema

### Users Collection
```javascript
{
  email: String,
  name: String,
  role: String, // 'patient', 'doctor', 'hospital', 'superadmin'
  phone: String,
  bloodType: String,
  age: Number,
  medicalHistory: [String],
  allergies: [String]
}
```

### Doctors Collection
```javascript
{
  userId: ObjectId,
  name: String,
  specialty: String,
  category: String,
  rating: Number,
  available: Boolean,
  consultationFee: Number,
  location: { type: 'Point', coordinates: [lng, lat] },
  experience: Number
}
```

### Appointments Collection
```javascript
{
  patientId: ObjectId,
  doctorId: ObjectId,
  date: Date,
  time: String,
  status: String, // 'pending', 'confirmed', 'completed', 'cancelled'
  paymentStatus: String,
  amount: Number
}
```

## Development Workflow

1. **Setup** - Follow SETUP.md to install dependencies
2. **Develop** - Make changes to code
3. **Test** - Test locally with all services running
4. **Commit** - Commit changes to Git
5. **Deploy** - Deploy to production

## Quick Commands

### Start All Services
```bash
# Windows
start-dev.bat

# Linux/Mac
./start-dev.sh

# Docker
docker-compose up -d
```

### Stop All Services
```bash
# Docker
docker-compose down

# Manual: Ctrl+C in each terminal
```

### View Logs
```bash
# Docker
docker-compose logs -f

# Backend
cd backend && npm run dev

# ML Service
cd ml-service && python main.py
```

### Database Operations
```bash
# Seed database
cd backend && node seed.js

# Connect to MongoDB
mongosh lifelink
```

## Current Status

✅ **Completed:**
- Mobile app UI/UX for all user roles
- Backend API with all endpoints
- ML service infrastructure
- Database models and schemas
- Docker setup
- Documentation

⏳ **Pending:**
- Your trained ML model integration
- Real-time WebSocket for tracking
- Push notifications
- Payment gateway integration
- Production deployment

## Next Steps

1. **Integrate Your Model** - Add your trained medicine detection model
2. **Test Thoroughly** - Test all features end-to-end
3. **Optimize** - Improve performance and user experience
4. **Deploy** - Deploy to production servers
5. **Monitor** - Set up monitoring and analytics

## Resources

- **Setup Guide**: [SETUP.md](SETUP.md)
- **Checklist**: [CHECKLIST.md](CHECKLIST.md)
- **Backend API**: [backend/README.md](backend/README.md)
- **ML Service**: [ml-service/README.md](ml-service/README.md)
- **Model Integration**: [ml-service/INTEGRATION.md](ml-service/INTEGRATION.md)

## Support

For questions or issues:
1. Check documentation files
2. Review API docs at `/docs` endpoints
3. Check logs for errors
4. Open an issue on GitHub

## License

MIT License - See LICENSE file for details

---

**Built with ❤️ for better healthcare**
