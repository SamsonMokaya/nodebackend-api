require('dotenv').config();

const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB', 
    connection.connection.host,
    connection.connection.name
    );

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

module.exports = connectDb;
