const express = require('express');
const router = express.Router();
const Patient = require('../models/PatientForm'); 
const mongoose = require('mongoose');
const { isConnected, store } = require('../config/fallbackStore');

router.post('/submit-form', async (req, res) => {
    const { applicationNo } = req.body;

    try {
        if (!isConnected()) {
            const existingApplication = store.patients.find(p => p.applicationNo === applicationNo);
            if (existingApplication) {
                return res.status(400).json({ message: 'Application No must be unique' });
            }

            const newApplication = {
                _id: 'pat_' + Date.now(),
                ...req.body,
                createdAt: new Date()
            };
            store.patients.push(newApplication);
            console.log('[Fallback Seed] Patient record submitted successfully:', applicationNo);
            return res.status(201).json({ message: 'Application submitted successfully' });
        }

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
        if (!isConnected()) {
            return res.json(store.patients);
        }

        const patients = await Patient.find(); 
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients' });
    }
});

// Get patient by ID
router.get('/:id', async (req, res) => {
    try {
        if (!isConnected()) {
            const patient = store.patients.find(p => p._id === req.params.id || p.applicationNo === req.params.id);
            if (!patient) return res.status(404).json({ message: 'Patient not found' });
            return res.json(patient);
        }

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

    try {
        if (!isConnected()) {
            const index = store.patients.findIndex(p => p._id === id || p.applicationNo === id);
            if (index === -1) return res.status(404).json({ message: 'Patient not found' });
            store.patients[index] = { ...store.patients[index], ...req.body };
            console.log('[Fallback Seed] Patient updated:', id);
            return res.status(200).json(store.patients[index]);
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Patient ID' });
        }

        const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json(updatedPatient);
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ message: 'Error updating patient', error });
    }
});

module.exports = router;

