const mongoose = require('mongoose');

const patientFormSchema = new mongoose.Schema({
  applicationNo: String,
  fullName: String,
  dob: Date,
  gender: String,
  relation: String,
  phone: String,
  emergency: String,
  address: String,
  bloodType: String,
  dateOfService: Date,
  chiefComplaint: String,
  historyOfIllness: String,
  pastMedication: String,
  providerName: String,
  height: Number,
  weight: Number,
  bmi: Number,
  pulse: Number,
  bp: String,
  temperature: Number,

  pastDisease: String,
  pastDosage: String,
  pastReports: String,

  activeProblems: String,
  presentProvider: String,
  activeMedication: String,
  presentDosage: String,
  testsToBeDone: String,
  assessment: String,
  dischargeDate: Date,

  bedNo: Number,
  wardNo: Number,
  floorNo: Number,
  block: String,
  consultantName: String,
});

const PatientForm = mongoose.model('PatientForm', patientFormSchema);

module.exports = PatientForm;
