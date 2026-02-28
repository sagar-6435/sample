# LifeLink - Emergency Healthcare Platform

A comprehensive healthcare mobile application for emergency medical services, doctor appointments, and health management.

## 🏗️ Architecture

```
┌─────────────────┐
│  Mobile App     │
│  (React Native) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Backend API    │
│  (Node/Express) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    MongoDB      │
└─────────────────┘
```

## 📁 Project Structure

```
lifelink/
├── mobile/          # React Native mobile app (Expo)
└── backend/         # Node.js/Express API server
```

## ✨ Features

### Patient Features
- 🚨 Emergency ambulance booking
- 📅 Doctor appointment scheduling
- 🏥 Hospital search and navigation
- 📄 Medical reports management
- 💊 Medicine information
- 📍 Real-time ambulance tracking
- 🔔 Notifications

### Doctor Features
- 📊 Patient management dashboard
- 📅 Schedule management
- 📈 Statistics and analytics
- 👥 Patient history

### Hospital Features
- 🚑 Fleet management
- 📦 Inventory tracking
- 👨‍⚕️ Staff management

### Admin Features
- 🎛️ System overview
- 👥 User management
- 📊 Analytics

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB 7.0+
- npm or yarn
- Expo Go app (for mobile testing)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd lifelink
```

2. **Install dependencies**
```bash
# Backend
cd backend
npm install

# Mobile App
cd ../mobile
npm install
```

3. **Setup environment variables**
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your configuration
```

4. **Start MongoDB**
```bash
mongod --dbpath /path/to/data
```

5. **Start all services**
```bash
# Windows
start-dev.bat

# Linux/Mac
./start-dev.sh
```

This will start:
- Backend API on port 3000
- Mobile App via Expo

## 🔧 Technology Stack

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT authentication
- Multer for file uploads

### Mobile App
- React Native
- Expo
- React Navigation
- Expo Camera & Image Picker

## 📚 Documentation

- Backend API: See [backend/README.md](backend/README.md)
- Complete Setup: See [SETUP.md](SETUP.md)
- Quick Start: See [QUICKSTART.md](QUICKSTART.md)

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Medicines
- `GET /api/medicines/search` - Search medicines
- `GET /api/medicines/:id` - Get medicine details
- `POST /api/medicines/detect` - Detect medicine from image
- `GET /api/medicines/suggestions` - Get medicine suggestions

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments` - Get user appointments
- `PUT /api/appointments/:id` - Update appointment

### Emergency
- `POST /api/emergency/request` - Request ambulance
- `GET /api/emergency/:id` - Track ambulance

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/lifelink
JWT_SECRET=your_secret_key
```

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

## 📱 Mobile Development

```bash
cd mobile
npm start
```

Then:
- Press `a` for Android
- Press `i` for iOS
- Scan QR code with Expo Go app



## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check documentation
2. Search existing issues
3. Create a new issue with details

## 🎯 Roadmap

- [ ] Real-time chat with doctors
- [ ] Video consultations
- [ ] Health tracking and analytics
- [ ] Prescription management
- [ ] Insurance integration
- [ ] Multi-language support
- [ ] Offline mode support
