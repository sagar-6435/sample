// User storage utility for web
let currentUser = {
  role: null,
  email: null,
  name: null,
};

export const setUserRole = (role) => {
  currentUser.role = role;
  localStorage.setItem('userRole', role);
};

export const getUserRole = () => {
  if (!currentUser.role) {
    currentUser.role = localStorage.getItem('userRole');
  }
  return currentUser.role;
};

export const setUserData = (data) => {
  currentUser = { ...currentUser, ...data };
  localStorage.setItem('userData', JSON.stringify(currentUser));
};

export const getUserData = () => {
  if (!currentUser.email) {
    const stored = localStorage.getItem('userData');
    if (stored) {
      currentUser = JSON.parse(stored);
    }
  }
  return currentUser;
};

export const clearUserData = () => {
  currentUser = {
    role: null,
    email: null,
    name: null,
  };
  localStorage.removeItem('userRole');
  localStorage.removeItem('userData');
};

export const getDashboardForRole = (role) => {
  const dashboardMap = {
    patient: '/patient-dashboard',
    doctor: '/doctor-dashboard',
    hospital: '/hospital-dashboard',
    superadmin: '/superadmin-dashboard',
  };
  return dashboardMap[role] || '/patient-dashboard';
};

export const getRoleInfo = (role) => {
  const roleInfo = {
    patient: {
      icon: 'user',
      color: '#1963eb',
      label: 'Patient',
    },
    doctor: {
      icon: 'stethoscope',
      color: '#10b981',
      label: 'Doctor',
    },
    hospital: {
      icon: 'building-2',
      color: '#f59e0b',
      label: 'Hospital Admin',
    },
    superadmin: {
      icon: 'shield',
      color: '#fbbf24',
      label: 'Super Admin',
    },
  };
  return roleInfo[role] || roleInfo.patient;
};
