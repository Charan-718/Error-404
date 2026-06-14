const PatientForm = require('../models/PatientForm');

exports.submitForm = async (req, res) => {
  try {
    console.log(req.body); 
    const newPatient = new PatientForm(req.body);  
    await newPatient.save();
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Form submission failed', error });
  }
};



exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPatient = await PatientForm.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient details updated successfully', updatedPatient });
  } catch (error) {
    console.error('Error updating patient details:', error);
    res.status(500).json({ message: 'Failed to update patient details', error });
  }
};



const generateUniqueId = () => {
  return `APP-${Date.now()}`; 
};





