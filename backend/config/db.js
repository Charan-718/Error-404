const mongoose = require('mongoose');
const { initFallbackStore } = require('./fallbackStore');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb+srv://lakshmithummu:O9L7BuW3sASM0gyK@cluster0.k2a5n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  
  try {
    // Set 4s timeout so server startup is fast even if Atlas DNS/cluster is unavailable
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 4000 });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.warn(`⚠️ MongoDB connection failed (${error.message}).`);
    initFallbackStore();
    // Do not call process.exit(1) - continue running with fallback seed!
  }
};

module.exports = connectDB;


