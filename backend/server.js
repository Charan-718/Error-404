const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const app = express();
const authenticate = require('./middleware/authenticate'); 
// const inventoryRoutes = require('./models/inventoryRoutes'); // Not available in repo
const path = require('path');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes'); 
const emergencyRoutes = require('./routes/emergencyRoutes');
require('dotenv').config();

connectDB();

app.use(cors()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static frontend files (enables All-in-One deployment)
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login_form/log.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login_form/hospital_signup.html'));
});

app.get('/log', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login_form/log.html'));
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/patient', patientRoutes);
app.use('/api', emergencyRoutes);

app.get('/api/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected route', user: req.user });
});

// app.use('/api/inventory', inventoryRoutes);

// Catch-all 404 handler for unmatched API routes
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

