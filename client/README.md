# LifeLink Web Client

React + Vite web application for LifeLink healthcare platform.

## Features

- 🎨 Modern UI matching mobile app design
- 🔐 Role-based authentication (Patient, Doctor, Hospital, Super Admin)
- 📱 Responsive design
- 🚀 Fast development with Vite
- 🎯 React Router for navigation

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
client/
├── src/
│   ├── pages/           # Page components
│   │   ├── SplashScreen.jsx
│   │   ├── AuthScreen.jsx
│   │   ├── PatientDashboard.jsx
│   │   ├── ProfileScreen.jsx
│   │   └── ...
│   ├── utils/           # Utility functions
│   │   └── userStorage.js
│   ├── App.jsx          # Main app with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
└── package.json
```

## Available Pages

### Implemented
- ✅ Splash Screen
- ✅ Authentication
- ✅ Patient Dashboard
- ✅ Profile Screen

### Coming Soon
- 🔄 Doctor Dashboard
- 🔄 Hospital Dashboard
- 🔄 Super Admin Dashboard
- 🔄 Emergency Screen
- 🔄 Appointment Booking
- 🔄 Medical Reports
- 🔄 Medicine Detection
- 🔄 History
- 🔄 Notifications
- 🔄 Edit Profile
- 🔄 Help & Support
- 🔄 About

## Technologies

- React 19
- Vite 8
- React Router DOM 7
- Lucide React (icons)
- CSS3 (custom styling)

## Development

The web app mirrors the mobile app functionality with:
- Same color scheme (#1963eb primary blue, #101622 dark background)
- Consistent UI components
- Role-based navigation
- LocalStorage for user data persistence
