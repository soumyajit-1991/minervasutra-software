const mongoose = require('mongoose');

const database = {
  connect: async () => {
    try {
      const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hr_management';
      
      await mongoose.connect("mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/?retryWrites=true&w=majority&appName=HACKETHIC", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log('✅ MongoDB connected successfully');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      throw error;
    }
  }
};

module.exports = { database };