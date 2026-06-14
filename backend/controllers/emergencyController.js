const Emergency = require('../models/emergencyModel');

exports.createEmergency = async (req, res) => {
    try {
        const emergencyData = new Emergency(req.body);
        await emergencyData.save();
        res.status(201).json({ success: true, message: 'Data saved successfully!' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ success: false, message: 'Error saving data' });
    }
};

// Get all emergency patients
exports.getAllEmergencyPatients = async (req, res) => {
  try {
      const emergencies = await Emergency.find();
      res.status(200).json(emergencies);
  } catch (error) {
      console.error("Error fetching emergency patients:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};