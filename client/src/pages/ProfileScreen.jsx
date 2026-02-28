import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Settings,
  Camera,
  Edit,
  Shield,
  Bell,
  CreditCard,
  HelpCircle,
  Info,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { getUserData, getUserRole, getRoleInfo, getDashboardForRole, clearUserData } from '../utils/userStorage';
import './ProfileScreen.css';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const userData = getUserData();
  const userRole = getUserRole();
  const roleInfo = getRoleInfo(userRole);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      clearUserData();
      navigate('/auth');
    }
  };

  const handleBackToDashboard = () => {
    const dashboard = getDashboardForRole(userRole);
    navigate(dashboard);
  };

  const menuItems = [
    { id: 0, icon: LayoutDashboard, title: 'Back to Dashboard', subtitle: `Return to ${roleInfo.label} dashboard`, action: 'dashboard', color: roleInfo.color },
    { id: 1, icon: Edit, title: 'Edit Profile', subtitle: 'Update your information', route: '/edit-profile' },
    { id: 2, icon: Shield, title: 'Privacy & Security', subtitle: 'Manage your privacy settings', route: null },
    { id: 3, icon: Bell, title: 'Notifications', subtitle: 'Configure notifications', route: '/notifications' },
    { id: 4, icon: CreditCard, title: 'Payment Methods', subtitle: 'Manage payment options', route: null },
    { id: 5, icon: HelpCircle, title: 'Help & Support', subtitle: 'Get help and support', route: '/help-support' },
    { id: 6, icon: Info, title: 'About', subtitle: 'App version and info', route: '/about' },
  ];

  const getRoleIcon = (iconName) => {
    const icons = {
      user: '👤',
      stethoscope: '🩺',
      'building-2': '🏥',
      shield: '🛡️'
    };
    return icons[iconName] || '👤';
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <button className="back-btn" onClick={handleBackToDashboard}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="profile-header-title">Profile</h1>
        <button className="settings-btn">
          <Settings size={24} />
        </button>
      </header>

      <main className="profile-main">
        <section className="profile-section">
          <div className="avatar-container">
            <div className="avatar" style={{ borderColor: roleInfo.color }}>
              <span className="avatar-icon">{getRoleIcon(roleInfo.icon)}</span>
            </div>
            <button className="edit-avatar-btn" style={{ backgroundColor: roleInfo.color }}>
              <Camera size={16} />
            </button>
          </div>
          <h2 className="user-name">{userData.name || 'User'}</h2>
          <p className="user-email">{userData.email || 'user@email.com'}</p>
          <div className="role-badge">
            <span className="role-icon">{getRoleIcon(roleInfo.icon)}</span>
            <span className="role-text" style={{ color: roleInfo.color }}>{roleInfo.label}</span>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-value">12</span>
              <span className="stat-label">Appointments</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value">8</span>
              <span className="stat-label">Reports</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value">O+</span>
              <span className="stat-label">Blood Type</span>
            </div>
          </div>
        </section>

        <section className="menu-section">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="menu-item"
                onClick={() => {
                  if (item.action === 'dashboard') {
                    handleBackToDashboard();
                  } else if (item.route) {
                    navigate(item.route);
                  }
                }}
              >
                <div className="menu-icon" style={item.color ? { backgroundColor: `${item.color}20` } : {}}>
                  <Icon size={24} color={item.color || '#1963eb'} />
                </div>
                <div className="menu-content">
                  <h3 className="menu-title">{item.title}</h3>
                  <p className="menu-subtitle">{item.subtitle}</p>
                </div>
                <ArrowLeft size={24} className="menu-arrow" style={{ transform: 'rotate(180deg)' }} />
              </button>
            );
          })}
        </section>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </main>
    </div>
  );
}
