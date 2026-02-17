const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
    try {
        console.log('Testing connection to:', process.env.MONGO_URI.substring(0, 30) + '...');
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log('SUCCESS: Connected to MongoDB Atlas');
        process.exit(0);
    } catch (err) {
        console.error('ERROR: Connection failed');
        console.error(err);
        process.exit(1);
    }
};

testConnection();
