const express = require('express');
const emergencyController = require('../controllers/emergencyController');

const router = express.Router();

router.post('/emergency', emergencyController.createEmergency);


router.get('/emergency/get-all', emergencyController.getAllEmergencyPatients);

module.exports = router;