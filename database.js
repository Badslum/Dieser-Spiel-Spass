require('dotenv').config();  // .env-Datei laden

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;  // URI aus der .env-Datei
    if (!uri) {
      throw new Error('MongoDB URI is not defined in .env file');
    }
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);  // Beende den Prozess bei einem Fehler
  }
};

module.exports = connectDB;