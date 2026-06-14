const express = require('express');
const router = express.Router();
const Patient = require('../models/PatientForm'); 
const mongoose = require('mongoose');
const { validateCode, submitForm } = require('../controllers/patientController');




router.post('/submit-form', async (req, res) => {
    const { applicationNo } = req.body;

    try {

        const existingApplication = await Patient.findOne({ applicationNo });
        if (existingApplication) {
            return res.status(400).json({ message: 'Application No must be unique' });
        }


        const newApplication = new Patient(req.body);
        await newApplication.save();
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error("Error submitting the application:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/get-all', async (req, res) => {
    try {
        const patients = await Patient.find(); 
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients' });
    }
});

// Get patient by ID
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient detail' });
    }
});



router.put('/update/:id', async (req, res) => {
    const { id } = req.params; 
    console.log("Received patient ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Patient ID' });
    }

    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json(updatedPatient);
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ message: 'Error updating patient', error });
    }
});






module.exports = router;
