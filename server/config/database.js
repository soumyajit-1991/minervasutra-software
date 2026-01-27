const mongoose = require('mongoose');

const database = {
  connect: async () => {
    try {
      const mongoUri = process.env.MONGO_URI || 'mongodb+srv://Minervasutra-hr:SM7zNjaNQg9zHxLC@cluster0.fi87xas.mongodb.net/';
      
      await mongoose.connect(mongoUri);
      // Note: `useNewUrlParser` and `useUnifiedTopology` are deprecated and ignored by the current MongoDB driver.
      
      if (process.env.MONGO_URI) {
        console.log('✅ MongoDB connected successfully (using MONGO_URI)');
      } else {
        console.log('✅ MongoDB connected successfully (using local default)');
      }
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      throw error;
    }
  }
};

module.exports = { database };