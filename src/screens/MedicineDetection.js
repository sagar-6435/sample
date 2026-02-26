import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MedicineDetection({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>AI Medicine Scanner</Text>
          <Text style={styles.headerSubtitle}>LIFELINK AI ACTIVE</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="history" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.cameraView}>
        <View style={styles.scannerFrame}>
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
          <View style={styles.scanLine} />
          <View style={styles.scanIcon}>
            <MaterialCommunityIcons name="focus-field" size={40} color="rgba(25,99,235,0.6)" />
            <Text style={styles.scanText}>SCANNING...</Text>
          </View>
        </View>
      </View>

      <View style={styles.detectionCard}>
        <View style={styles.detectionHeader}>
          <View>
            <Text style={styles.detectionBadge}>DETECTION SUCCESS</Text>
            <Text style={styles.medicineName}>Amoxicillin 500mg</Text>
            <Text style={styles.medicineType}>Antibiotic • Capsule Form</Text>
          </View>
          <View style={styles.medicineIcon}>
            <MaterialCommunityIcons name="pill" size={24} color="#1963eb" />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Patient Age</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} value="28" keyboardType="number-pad" />
              <Text style={styles.inputUnit}>YRS</Text>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Dosage Advice</Text>
            <View style={styles.dosageBox}>
              <Text style={styles.dosageText}>1 cap / 8 hrs</Text>
            </View>
          </View>
        </View>

        <View style={styles.priceSection}>
          <View style={styles.priceSectionHeader}>
            <Text style={styles.inputLabel}>Price Comparison</Text>
            <Text style={styles.nearbyBadge}>NEARBY</Text>
          </View>
          <View style={styles.shopCard}>
            <View style={styles.shopInfo}>
              <MaterialCommunityIcons name="store" size={16} color="#10b981" />
              <Text style={styles.shopName}>MediCare Plus</Text>
            </View>
            <Text style={styles.shopPrice}>$12.50</Text>
          </View>
          <View style={styles.shopCard}>
            <View style={styles.shopInfo}>
              <MaterialCommunityIcons name="store" size={16} color="#94a3b8" />
              <Text style={styles.shopName}>Life Pharma</Text>
            </View>
            <Text style={styles.shopPrice}>$14.20</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.reserveBtn}>
          <MaterialCommunityIcons name="cart" size={20} color="#fff" />
          <Text style={styles.reserveBtnText}>Reserve at MediCare</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cameraControls}>
        <TouchableOpacity style={styles.controlBtn}>
          <MaterialCommunityIcons name="image" size={24} color="#cbd5e1" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanButton}>
          <View style={styles.scanButtonInner}>
            <MaterialCommunityIcons name="qrcode-scan" size={32} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn}>
          <MaterialCommunityIcons name="flash" size={24} color="#cbd5e1" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('PatientDashboard')}
        >
          <MaterialCommunityIcons name="home-outline" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialCommunityIcons name="qrcode-scan" size={24} color="#1963eb" />
          <Text style={styles.navTextActive}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('AmbulanceTracking')}
        >
          <MaterialCommunityIcons name="ambulance" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Ambulance</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <MaterialCommunityIcons name="account-outline" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 24,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1963eb',
    letterSpacing: 2,
  },
  cameraView: {
    flex: 1,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerFrame: {
    width: SCREEN_WIDTH * 0.64,
    height: SCREEN_WIDTH * 0.64,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#1963eb',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#1963eb',
  },
  scanIcon: {
    alignItems: 'center',
    gap: 8,
  },
  scanText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'rgba(25,99,235,0.6)',
    letterSpacing: 2,
  },
  detectionCard: {
    backgroundColor: 'rgba(28,31,39,0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  detectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 16,
  },
  detectionBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1963eb',
    letterSpacing: 1,
    marginBottom: 4,
  },
  medicineName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  medicineType: {
    fontSize: 14,
    color: '#94a3b8',
  },
  medicineIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(25,99,235,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(25,99,235,0.3)',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  inputUnit: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  dosageBox: {
    backgroundColor: 'rgba(25,99,235,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(25,99,235,0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    justifyContent: 'center',
  },
  dosageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1963eb',
  },
  priceSection: {
    gap: 8,
    marginBottom: 16,
  },
  priceSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nearbyBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1963eb',
  },
  shopCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 8,
  },
  shopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shopName: {
    fontSize: 14,
    color: '#cbd5e1',
  },
  shopPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  reserveBtn: {
    flexDirection: 'row',
    backgroundColor: '#1963eb',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  reserveBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cameraControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 32,
    backgroundColor: '#101622',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  controlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 4,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  scanButtonInner: {
    flex: 1,
    borderRadius: 36,
    backgroundColor: '#1963eb',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1963eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#101622',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navItemActive: {
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94a3b8',
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: '500',
    color: '#1963eb',
  },
});
