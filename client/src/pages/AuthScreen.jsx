import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, User, Stethoscope, Building2, ShieldCheck } from 'lucide-react';
import { setUserRole, setUserData, getDashboardForRole } from '../utils/userStorage';
import './AuthScreen.css';

export default function AuthScreen() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleContinue = () => {
    setUserRole(selectedRole);
    setUserData({
      email: email,
      name: email.split('@')[0],
    });

    const dashboard = getDashboardForRole(selectedRole);
    navigate(dashboard);
  };

  const handleSuperAdmin = () => {
    setUserRole('superadmin');
    setUserData({ email: 'admin@lifelink.com', name: 'Super Admin' });
    navigate('/superadmin-dashboard');
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-header">
          <ArrowLeft size={24} />
          <h2 className="auth-header-title">LifeLink</h2>
        </div>

        <div className="auth-hero">
          <h1 className="auth-title">Join LifeLink</h1>
          <p className="auth-subtitle">Empowering emergency healthcare with AI</p>
        </div>

        <div className="role-section">
          <label className="section-label">CHOOSE YOUR ROLE</label>
          <div className="role-grid">
            <button
              className={`role-card ${selectedRole === 'patient' ? 'active' : ''}`}
              onClick={() => setSelectedRole('patient')}
            >
              <div className={`role-icon ${selectedRole === 'patient' ? 'active' : ''}`}>
                <User size={24} />
              </div>
              <span className="role-text">Patient</span>
            </button>

            <button
              className={`role-card ${selectedRole === 'doctor' ? 'active' : ''}`}
              onClick={() => setSelectedRole('doctor')}
            >
              <div className={`role-icon ${selectedRole === 'doctor' ? 'active' : ''}`}>
                <Stethoscope size={24} />
              </div>
              <span className="role-text">Doctor</span>
            </button>

            <button
              className={`role-card ${selectedRole === 'hospital' ? 'active' : ''}`}
              onClick={() => setSelectedRole('hospital')}
            >
              <div className={`role-icon ${selectedRole === 'hospital' ? 'active' : ''}`}>
                <Building2 size={24} />
              </div>
              <span className="role-text">Hospital</span>
            </button>
          </div>
        </div>

        <div className="form-section">
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="input-container">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                className="input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">One-Time Password (OTP)</label>
            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                />
              ))}
            </div>
            <div className="otp-footer">
              <span className="otp-footer-text">Didn't receive code?</span>
              <button className="resend-btn">Resend (45s)</button>
            </div>
          </div>

          <button className="continue-btn" onClick={handleContinue}>
            Continue to Dashboard
          </button>

          <button className="superadmin-btn" onClick={handleSuperAdmin}>
            <ShieldCheck size={20} />
            <span>Super Admin Access</span>
          </button>
        </div>

        <div className="auth-footer">
          <p className="footer-text">
            By signing up, you agree to our{' '}
            <a href="#" className="link">Terms of Service</a> and{' '}
            <a href="#" className="link">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
