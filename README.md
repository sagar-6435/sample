# LifeLink - React Native Healthcare App

A comprehensive healthcare mobile application built with React Native, converted from HTML templates. Features emergency services, ambulance tracking, appointment booking, medical reports, and AI-powered medicine detection.

## Features

- **Splash Screen** - Animated loading screen with branding
- **Authentication** - Multi-role login (Patient, Doctor, Hospital)
- **Patient Dashboard** - Search doctors, view nearby hospitals, book appointments
- **Doctor Dashboard** - Manage appointments, duty status, patient schedules
- **Hospital Dashboard** - Fleet management, blood bank inventory, offline bookings
- **Emergency SOS** - Quick emergency alert with countdown timer
- **Ambulance Tracking** - Real-time ambulance location tracking
- **Appointment Booking** - Schedule appointments with doctors
- **Medical Reports** - Upload and manage medical documents
- **Medicine Detection** - AI-powered medicine scanner with price comparison

## Tech Stack

- React Native 0.73
- Expo ~50.0
- React Navigation 6
- @expo/vector-icons (Material Community Icons)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
- **iOS**: Press `i` or run `npm run ios`
- **Android**: Press `a` or run `npm run android`
- **Web**: Press `w` or run `npm run web`

## Project Structure

```
├── App.js                          # Main navigation setup
├── package.json                    # Dependencies
├── src/
│   └── screens/
│       ├── SplashScreen.js         # App loading screen
│       ├── AuthScreen.js           # Login/signup
│       ├── PatientDashboard.js     # Patient home screen
│       ├── DoctorDashboard.js      # Doctor home screen
│       ├── HospitalDashboard.js    # Hospital admin panel
│       ├── EmergencyScreen.js      # SOS emergency alert
│       ├── AmbulanceTracking.js    # Live ambulance tracking
│       ├── AppointmentBooking.js   # Book doctor appointments
│       ├── MedicalReports.js       # Medical records management
│       └── MedicineDetection.js    # AI medicine scanner
```

## Screens Overview

### Splash Screen
- Animated loading with progress bar
- Auto-navigates to Auth screen after 3 seconds

### Authentication
- Role selection (Patient/Doctor/Hospital)
- Email and OTP input
- Conditional fields based on role

### Patient Dashboard
- Search functionality
- Category filters
- Nearby hospitals map
- Available doctors list
- Ambulance status
- Emergency button

### Doctor Dashboard
- Duty status toggle
- Facility selection
- Today's schedule
- Appointment management
- Virtual consultation indicators

### Hospital Dashboard
- Active dispatch statistics
- Facility photo gallery
- Blood bank inventory
- Vehicle registration form
- Offline bookings table

### Emergency Screen
- 5-second countdown timer
- Auto-trigger SOS
- Location tracking
- Medical profile sharing
- Cancel option

### Ambulance Tracking
- Live map view
- ETA display
- Driver information
- Call/chat options
- Distance tracking

### Appointment Booking
- Doctor profile
- Date selection calendar
- Time slot picker (Morning/Afternoon)
- AI insights
- Payment options

### Medical Reports
- Upload functionality
- Search and filters
- Report cards with status
- AI analysis insights
- Category organization

### Medicine Detection
- Camera scanner interface
- Medicine identification
- Dosage recommendations
- Price comparison
- Nearby pharmacy locations

## Navigation Flow

```
Splash → Auth → [Patient/Doctor/Hospital] Dashboard
                      ↓
            [Various Feature Screens]
```

## Color Scheme

- Primary: #1963eb (Blue)
- Emergency: #ef4444 (Red)
- Background Dark: #101622
- Background Light: #f6f6f8
- Success: #10b981 (Green)
- Warning: #fbbf24 (Amber)

## Icons

Using Material Community Icons from @expo/vector-icons:
- home, doctor, hospital-building
- ambulance, emergency, alert-circle
- calendar, clock, map-marker
- pill, medical-bag, heart-pulse
- And many more...

## Future Enhancements

- Real-time notifications
- Video consultation integration
- Payment gateway integration
- Wearable device sync
- Multi-language support
- Offline mode
- Push notifications
- Biometric authentication

## License

MIT License - Feel free to use this project for learning and development.

## Credits

Converted from HTML templates to React Native
Original design: LifeLink Healthcare Platform
