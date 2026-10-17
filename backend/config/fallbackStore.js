const bcrypt = require('bcryptjs');

let isFallbackActive = false;

const isConnected = () => {
  const mongoose = require('mongoose');
  return mongoose.connection.readyState === 1;
};

const store = {
  users: [
    {
      _id: 'user_seed_001',
      employeeID: 'EMP001',
      firstName: 'Dr. John',
      lastName: 'Doe',
      email: 'admin@hospital.com',
      phone: '9876543210',
      password: bcrypt.hashSync('admin123', 10),
    },
    {
      _id: 'user_seed_002',
      employeeID: 'EMP002',
      firstName: 'Sarah',
      lastName: 'Connor',
      email: 'demo@hospital.com',
      phone: '9123456789',
      password: bcrypt.hashSync('demo123', 10),
    }
  ],
  patients: [
    {
      _id: '66f001122334455667788990',
      applicationNo: 'APP-17290001',
      fullName: 'Rahul Sharma',
      dob: '1990-05-15',
      gender: 'Male',
      relation: 'Self',
      phone: '9876501234',
      emergency: '9876509999',
      address: '123 Health Ave, City',
      bloodType: 'O+',
      dateOfService: '2026-10-15',
      chiefComplaint: 'Severe fever and body pain',
      historyOfIllness: 'Fever for 3 days',
      pastMedication: 'Paracetamol',
      providerName: 'City Hospital',
      height: '175',
      weight: '70',
      bmi: '22.8',
      pulse: '78',
      bp: '120/80',
      temperature: '101'
    },
    {
      _id: '66f001122334455667788991',
      applicationNo: 'APP-17290002',
      fullName: 'Priya Patel',
      dob: '1995-08-20',
      gender: 'Female',
      relation: 'Self',
      phone: '9876505678',
      emergency: '9876508888',
      address: '456 Care Lane, City',
      bloodType: 'B+',
      dateOfService: '2026-10-16',
      chiefComplaint: 'Persistent cough',
      historyOfIllness: 'Mild asthma',
      pastMedication: 'Inhaler',
      providerName: 'Apollo Care',
      height: '162',
      weight: '58',
      bmi: '22.1',
      pulse: '74',
      bp: '115/75',
      temperature: '98.6'
    }
  ],
  emergencies: [
    {
      _id: '66f001122334455667788995',
      applicationNo: 'EMG-101',
      joiningDate: '2026-10-17',
      gender: 'Male',
      estimatedAge: '45',
      physicalCondition: 'Critical - Head injury',
      doctorAssigned: 'Dr. Smith'
    },
    {
      _id: '66f001122334455667788996',
      applicationNo: 'EMG-102',
      joiningDate: '2026-10-18',
      gender: 'Female',
      estimatedAge: '32',
      physicalCondition: 'Stable - Fracture',
      doctorAssigned: 'Dr. John Doe'
    }
  ]
};

const initFallbackStore = () => {
  isFallbackActive = true;
  console.log('✅ In-memory fallback seed database initialized with sample users, patients, and emergencies.');
};

module.exports = {
  isConnected,
  isFallbackActive: () => isFallbackActive,
  initFallbackStore,
  store
};
