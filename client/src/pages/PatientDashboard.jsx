import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  Ambulance,
  Calendar,
  FileText,
  Pill,
  Bell,
  User,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Home
} from 'lucide-react';
import './PatientDashboard.css';

const MOCK_DOCTORS = [
  { id: '1', name: 'Dr. Sarah James', specialty: 'Cardiologist', category: 'cardio', rating: 4.9, available: true, fee: 50, distance: 1.2 },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Dermatologist', category: 'skin', rating: 4.8, available: true, fee: 45, distance: 0.8 },
  { id: '3', name: 'Dr. Emily Williams', specialty: 'Neurologist', category: 'neurology', rating: 4.9, available: false, fee: 60, distance: 2.1 },
  { id: '4', name: 'Dr. Priya Sharma', specialty: 'Hair Specialist', category: 'hair', rating: 4.7, available: true, fee: 40, distance: 1.5 },
  { id: '5', name: 'Dr. James Wilson', specialty: 'Orthopedic', category: 'orthopedic', rating: 4.8, available: true, fee: 55, distance: 1.8 }
];

const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🏥' },
  { id: 'cardio', name: 'Cardio', icon: '❤️' },
  { id: 'skin', name: 'Skin', icon: '✋' },
  { id: 'hair', name: 'Hair', icon: '💇' },
  { id: 'neurology', name: 'Neuro', icon: '🧠' },
  { id: 'orthopedic', name: 'Bones', icon: '🦴' }
];

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDoctors = MOCK_DOCTORS.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doctor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <Heart className="logo-icon" size={28} />
            <h1 className="logo-text">LifeLink</h1>
          </div>
          <div className="header-right">
            <button className="icon-btn" onClick={() => navigate('/notifications')}>
              <Bell size={20} />
              <span className="badge">3</span>
            </button>
            <button className="icon-btn" onClick={() => navigate('/profile')}>
              <User size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-content">
            <h2 className="welcome-title">Welcome Back!</h2>
            <p className="welcome-subtitle">How can we help you today?</p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <button className="action-card emergency" onClick={() => navigate('/emergency')}>
            <div className="action-icon">
              <Ambulance size={28} />
            </div>
            <div className="action-content">
              <h3 className="action-title">Emergency</h3>
              <p className="action-subtitle">Call ambulance now</p>
            </div>
          </button>

          <button className="action-card" onClick={() => navigate('/appointment-booking')}>
            <div className="action-icon">
              <Calendar size={28} />
            </div>
            <div className="action-content">
              <h3 className="action-title">Book Appointment</h3>
              <p className="action-subtitle">Schedule with doctor</p>
            </div>
          </button>

          <button className="action-card" onClick={() => navigate('/medical-reports')}>
            <div className="action-icon">
              <FileText size={28} />
            </div>
            <div className="action-content">
              <h3 className="action-title">Medical Reports</h3>
              <p className="action-subtitle">View your records</p>
            </div>
          </button>

          <button className="action-card" onClick={() => navigate('/medicine-detection')}>
            <div className="action-icon">
              <Pill size={28} />
            </div>
            <div className="action-content">
              <h3 className="action-title">Medicine Detection</h3>
              <p className="action-subtitle">Scan & identify</p>
            </div>
          </button>
        </section>

        {/* Search Section */}
        <section className="search-section">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Search doctors, specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Categories */}
        <section className="categories-section">
          <h3 className="section-title">Specialties</h3>
          <div className="categories-grid">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Doctors List */}
        <section className="doctors-section">
          <div className="section-header">
            <h3 className="section-title">Available Doctors</h3>
            <span className="section-count">{filteredDoctors.length} doctors</span>
          </div>
          <div className="doctors-grid">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-header">
                  <div className="doctor-avatar">
                    <User size={32} />
                  </div>
                  <div className={`availability-badge ${doctor.available ? 'available' : 'unavailable'}`}>
                    <Clock size={12} />
                    <span>{doctor.available ? 'Available' : 'Busy'}</span>
                  </div>
                </div>
                <div className="doctor-info">
                  <h4 className="doctor-name">{doctor.name}</h4>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  <div className="doctor-meta">
                    <div className="meta-item">
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <span>{doctor.rating}</span>
                    </div>
                    <div className="meta-item">
                      <MapPin size={14} />
                      <span>{doctor.distance} km</span>
                    </div>
                    <div className="meta-item">
                      <DollarSign size={14} />
                      <span>${doctor.fee}</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="book-btn"
                  onClick={() => navigate('/appointment-booking', { state: { doctor } })}
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-item active">
          <Home size={24} />
          <span>Home</span>
        </button>
        <button className="nav-item" onClick={() => navigate('/history')}>
          <Clock size={24} />
          <span>History</span>
        </button>
        <button className="nav-item" onClick={() => navigate('/emergency')}>
          <Ambulance size={24} />
          <span>Emergency</span>
        </button>
        <button className="nav-item" onClick={() => navigate('/profile')}>
          <User size={24} />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}
