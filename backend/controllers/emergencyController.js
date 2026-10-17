const Emergency = require('../models/emergencyModel');
const { isConnected, store } = require('../config/fallbackStore');

exports.createEmergency = async (req, res) => {
    try {
        if (!isConnected()) {
            const newEmergency = {
                _id: 'emg_' + Date.now(),
                ...req.body,
                createdAt: new Date()
            };
            store.emergencies.push(newEmergency);
            console.log('[Fallback Seed] Emergency record saved:', newEmergency.applicationNo);
            return res.status(201).json({ success: true, message: 'Data saved successfully!' });
        }

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
      if (!isConnected()) {
          return res.status(200).json(store.emergencies);
      }

      const emergencies = await Emergency.find();
      res.status(200).json(emergencies);
  } catch (error) {
      console.error("Error fetching emergency patients:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};