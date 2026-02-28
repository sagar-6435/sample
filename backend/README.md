# LifeLink Backend API

Backend API for the LifeLink healthcare application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI and JWT secret

4. Seed the database (optional):
```bash
node seed.js
```

5. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login/Register with email and role
- `POST /api/auth/verify-otp` - Verify OTP

### Doctors
- `GET /api/doctors` - Get all doctors (supports filters: category, search, lat, lng, radius)
- `GET /api/doctors/:id` - Get doctor by ID
- `PATCH /api/doctors/:id/availability` - Update doctor availability

### Hospitals
- `GET /api/hospitals` - Get hospitals (supports: lat, lng, radius)
- `GET /api/hospitals/:id` - Get hospital by ID
- `PATCH /api/hospitals/:id/blood-bank` - Update blood bank inventory

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/patient/:patientId` - Get patient appointments
- `GET /api/appointments/doctor/:doctorId` - Get doctor appointments
- `PATCH /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Ambulances
- `GET /api/ambulances/nearby` - Get nearby ambulances (lat, lng, radius)
- `GET /api/ambulances/:id` - Get ambulance by ID
- `POST /api/ambulances` - Register new ambulance
- `PATCH /api/ambulances/:id/location` - Update ambulance location
- `PATCH /api/ambulances/:id/status` - Update ambulance status

### Medicines
- `GET /api/medicines/search?query=` - Search medicines
- `GET /api/medicines/:id` - Get medicine by ID
- `POST /api/medicines/detect` - AI medicine detection
- `GET /api/medicines/suggestions` - Get medicine suggestions

### Medical Reports
- `GET /api/reports/patient/:patientId` - Get patient reports
- `POST /api/reports` - Upload new report
- `GET /api/reports/:id` - Get report by ID
- `DELETE /api/reports/:id` - Delete report

### Users
- `GET /api/users/:id` - Get user profile
- `PATCH /api/users/:id` - Update user profile
- `GET /api/users/email/:email` - Get user by email

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled
