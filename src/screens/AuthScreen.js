import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AuthScreen({ navigation }) {
  const [selectedRole, setSelectedRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleContinue = () => {
    if (selectedRole === 'patient') {
      navigation.replace('PatientDashboard');
    } else if (selectedRole === 'doctor') {
      navigation.replace('DoctorDashboard');
    } else {
      navigation.replace('HospitalDashboard');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        <Text style={styles.headerTitle}>LifeLink</Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.title}>Join LifeLink</Text>
        <Text style={styles.subtitle}>Empowering emergency healthcare with AI</Text>
      </View>

      <View style={styles.roleSection}>
        <Text style={styles.sectionLabel}>CHOOSE YOUR ROLE</Text>
        <View style={styles.roleGrid}>
          <TouchableOpacity 
            style={[styles.roleCard, selectedRole === 'patient' && styles.roleCardActive]}
            onPress={() => setSelectedRole('patient')}
          >
            <View style={[styles.roleIcon, selectedRole === 'patient' && styles.roleIconActive]}>
              <MaterialCommunityIcons name="account" size={24} color={selectedRole === 'patient' ? '#1963eb' : '#94a3b8'} />
            </View>
            <Text style={styles.roleText}>Patient</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.roleCard}
            onPress={() => setSelectedRole('doctor')}
          >
            <View style={styles.roleIcon}>
              <MaterialCommunityIcons name="doctor" size={24} color="#94a3b8" />
            </View>
            <Text style={[styles.roleText, { opacity: 0.6 }]}>Doctor</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.roleCard}
            onPress={() => setSelectedRole('hospital')}
          >
            <View style={styles.roleIcon}>
              <MaterialCommunityIcons name="hospital-building" size={24} color="#94a3b8" />
            </View>
            <Text style={[styles.roleText, { opacity: 0.6 }]}>Hospital</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>One-Time Password (OTP)</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(text) => {
                  const newOtp = [...otp];
                  newOtp[index] = text;
                  setOtp(newOtp);
                }}
              />
            ))}
          </View>
          <View style={styles.otpFooter}>
            <Text style={styles.otpFooterText}>Didn't receive code?</Text>
            <TouchableOpacity>
              <Text style={styles.resendText}>Resend (45s)</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue to Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.superAdminBtn} 
          onPress={() => navigation.replace('SuperAdminDashboard')}
        >
          <MaterialCommunityIcons name="shield-crown" size={20} color="#fbbf24" />
          <Text style={styles.superAdminBtnText}>Super Admin Access</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By signing up, you agree to our{'\n'}
          <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101622',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SCREEN_WIDTH * 0.06,
    paddingTop: 20,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 24,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.08,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: SCREEN_WIDTH * 0.04,
    color: '#94a3b8',
  },
  roleSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1963eb',
    letterSpacing: 1,
    marginBottom: 16,
  },
  roleGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  roleCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  roleCardActive: {
    borderColor: '#1963eb',
    borderWidth: 2,
  },
  roleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(148,163,184,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  roleIconActive: {
    backgroundColor: 'rgba(25,99,235,0.2)',
  },
  roleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  formSection: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
    height: 48,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  otpInput: {
    flex: 1,
    height: 56,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  otpFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  otpFooterText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  resendText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1963eb',
  },
  button: {
    backgroundColor: '#1963eb',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  superAdminBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(251,191,36,0.1)',
    borderRadius: 12,
    height: 48,
    marginTop: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.3)',
  },
  superAdminBtnText: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  link: {
    color: '#1963eb',
    fontWeight: '500',
  },
});
