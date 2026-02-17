const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        const uri = process.env.MONGO_URI;
        console.log(`URI length: ${uri?.length || 0}`);
        console.log(`URI Start: ${uri?.substring(0, 20)}...`);
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.log('TIP: Check if your IP is whitelisted in MongoDB Atlas (Network Access).');
        // Don't exit process in dev, maybe it's a temporary network issue
    }
};

module.exports = connectDB;
