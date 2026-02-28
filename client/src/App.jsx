import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import AuthScreen from './pages/AuthScreen';
import PatientDashboard from './pages/PatientDashboard';
import ProfileScreen from './pages/ProfileScreen';
import './App.css';

// Placeholder components for other pages
const DoctorDashboard = () => <div className="placeholder">Doctor Dashboard - Coming Soon</div>;
const HospitalDashboard = () => <div className="placeholder">Hospital Dashboard - Coming Soon</div>;
const SuperAdminDashboard = () => <div className="placeholder">Super Admin Dashboard - Coming Soon</div>;
const EmergencyScreen = () => <div className="placeholder">Emergency Screen - Coming Soon</div>;
const AppointmentBooking = () => <div className="placeholder">Appointment Booking - Coming Soon</div>;
const MedicalReports = () => <div className="placeholder">Medical Reports - Coming Soon</div>;
const MedicineDetection = () => <div className="placeholder">Medicine Detection - Coming Soon</div>;
const HistoryScreen = () => <div className="placeholder">History - Coming Soon</div>;
const NotificationsScreen = () => <div className="placeholder">Notifications - Coming Soon</div>;
const EditProfile = () => <div className="placeholder">Edit Profile - Coming Soon</div>;
const HelpSupport = () => <div className="placeholder">Help & Support - Coming Soon</div>;
const About = () => <div className="placeholder">About - Coming Soon</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/auth" element={<AuthScreen />} />
        
        {/* Dashboards */}
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
        
        {/* Features */}
        <Route path="/emergency" element={<EmergencyScreen />} />
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
        <Route path="/medical-reports" element={<MedicalReports />} />
        <Route path="/medicine-detection" element={<MedicineDetection />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/notifications" element={<NotificationsScreen />} />
        
        {/* Profile */}
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/about" element={<About />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
