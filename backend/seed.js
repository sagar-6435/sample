const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Hospital = require('./models/Hospital');
const Medicine = require('./models/Medicine');
const Ambulance = require('./models/Ambulance');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lifelink');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Hospital.deleteMany({});
    await Medicine.deleteMany({});
    await Ambulance.deleteMany({});

    // Create sample users
    const users = await User.create([
      { email: 'patient@test.com', name: 'John Doe', role: 'patient', bloodType: 'O+', age: 28 },
      { email: 'doctor@test.com', name: 'Dr. Sarah James', role: 'doctor' },
      { email: 'hospital@test.com', name: 'City Hospital Admin', role: 'hospital' }
    ]);

    // Create sample doctors
    await Doctor.create([
      {
        userId: users[1]._id,
        name: 'Dr. Sarah James',
        specialty: 'Cardiologist',
        category: 'cardio',
        rating: 4.9,
        available: true,
        consultationFee: 50,
        location: { type: 'Point', coordinates: [-73.935242, 40.730610] },
        experience: 15,
        qualifications: ['MD', 'FACC']
      },
      {
        userId: users[1]._id,
        name: 'Dr. Michael Chen',
        specialty: 'Dermatologist',
        category: 'skin',
        rating: 4.8,
        available: true,
        consultationFee: 45,
        location: { type: 'Point', coordinates: [-73.945242, 40.735610] },
        experience: 10
      },
      {
        userId: users[1]._id,
        name: 'Dr. Emily Williams',
        specialty: 'Neurologist',
        category: 'neurology',
        rating: 4.9,
        available: false,
        consultationFee: 60,
        location: { type: 'Point', coordinates: [-73.925242, 40.725610] },
        experience: 20
      }
    ]);

    // Create sample hospitals
    const hospitals = await Hospital.create([
      {
        name: 'City General Hospital',
        location: { type: 'Point', coordinates: [-73.935242, 40.730610] },
        rating: 4.5,
        beds: 250,
        emergency: true,
        bloodBank: [
          { type: 'O+', units: 24 },
          { type: 'A-', units: 3 },
          { type: 'B+', units: 15 }
        ],
        facilities: ['ICU', 'Emergency', 'Surgery', 'Lab']
      },
      {
        name: 'St. Mary Medical Center',
        location: { type: 'Point', coordinates: [-73.945242, 40.735610] },
        rating: 4.7,
        beds: 180,
        emergency: true,
        facilities: ['Emergency', 'Cardiology', 'Pediatrics']
      }
    ]);

    // Create sample medicines
    await Medicine.create([
      {
        name: 'Paracetamol 500mg',
        type: 'Tablet',
        category: 'Pain Relief',
        dosage: '1 tab / 6 hrs',
        prices: [
          { shop: 'MediCare Plus', price: 5, available: true },
          { shop: 'Life Pharma', price: 5.5, available: true }
        ]
      },
      {
        name: 'Amoxicillin 500mg',
        type: 'Capsule',
        category: 'Antibiotics',
        dosage: '1 cap / 8 hrs',
        prices: [
          { shop: 'MediCare Plus', price: 12.5, available: true },
          { shop: 'Life Pharma', price: 14.2, available: true }
        ]
      },
      {
        name: 'Vitamin D3',
        type: 'Tablet',
        category: 'Supplements',
        dosage: '1 tab / day',
        prices: [
          { shop: 'HealthMart', price: 12, available: true }
        ]
      }
    ]);

    // Create sample ambulances
    await Ambulance.create([
      {
        vehiclePlate: 'AMB-9922',
        hospitalId: hospitals[0]._id,
        driverId: users[1]._id,
        status: 'available',
        location: { type: 'Point', coordinates: [-73.935242, 40.730610] }
      },
      {
        vehiclePlate: 'AMB-5544',
        hospitalId: hospitals[1]._id,
        status: 'available',
        location: { type: 'Point', coordinates: [-73.945242, 40.735610] }
      }
    ]);

    console.log('✓ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
