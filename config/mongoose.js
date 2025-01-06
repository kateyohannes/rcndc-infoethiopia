const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/rcndc_test";


const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      process.exit(1);
    }
};

module.exports = connectDB