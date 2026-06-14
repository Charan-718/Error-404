const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
    applicationNo: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    gender: { type: String, required: true },
    estimatedAge: { type: Number, required: true },
    physicalCondition: { type: String, required: true },
    doctorAssigned: { type: String, required: true }
});

module.exports = mongoose.model('Emergency', emergencySchema);