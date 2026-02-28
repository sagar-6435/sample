// Simple in-memory storage for user data
// In production, use AsyncStorage or SecureStore

let currentUser = {
  role: null,
  email: null,
  name: null,
};

export const setUserRole = (role) => {
  currentUser.role = role;
};

export const getUserRole = () => {
  return currentUser.role;
};

export const setUserData = (data) => {
  currentUser = { ...currentUser, ...data };
};

export const getUserData = () => {
  return currentUser;
};

export const clearUserData = () => {
  currentUser = {
    role: null,
    email: null,
    name: null,
  };
};

// Role-based dashboard mapping
export const getDashboardForRole = (role) => {
  const dashboardMap = {
    patient: 'PatientDashboard',
    doctor: 'DoctorDashboard',
    hospital: 'HospitalDashboard',
    superadmin: 'SuperAdminDashboard',
  };
  return dashboardMap[role] || 'PatientDashboard';
};

// Role-based user info
export const getRoleInfo = (role) => {
  const roleInfo = {
    patient: {
      icon: 'account',
      color: '#1963eb',
      label: 'Patient',
    },
    doctor: {
      icon: 'doctor',
      color: '#10b981',
      label: 'Doctor',
    },
    hospital: {
      icon: 'hospital-building',
      color: '#f59e0b',
      label: 'Hospital Admin',
    },
    superadmin: {
      icon: 'shield-crown',
      color: '#fbbf24',
      label: 'Super Admin',
    },
  };
  return roleInfo[role] || roleInfo.patient;
};
