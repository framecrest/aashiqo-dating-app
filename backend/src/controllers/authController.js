const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const registerUser = async (req, res) => {
    const { name, email, phone, password, age, gender, city } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { phone }] });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        age,
        gender,
        location: { city }, // Structure matches new schema
        auth_provider: 'local'
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            onboarded: user.onboarded,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};

const authUser = async (req, res) => {
    const { email, password, deviceId } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    // Check Account Lock
    if (user.lockUntil && user.lockUntil > Date.now()) {
        res.status(403);
        throw new Error(`Account locked. Try again after ${user.lockUntil.toLocaleTimeString()}`);
    }

    if (await bcrypt.compare(password, user.password)) {
        // Login Success
        user.loginAttempts = 0;
        user.lockUntil = undefined;

        // Track Session
        user.deviceSessions.push({
            deviceId: deviceId || 'unknown',
            lastActive: new Date(),
            token: 'current-session' // In real app, store hash of refresh token
        });

        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            onboarded: user.onboarded,
            token: generateToken(user._id),
        });
    } else {
        // Login Failed
        user.loginAttempts = (user.loginAttempts || 0) + 1;

        if (user.loginAttempts >= 5) {
            user.lockUntil = Date.now() + 15 * 60 * 1000; // Lock for 15 minutes
        }

        await user.save();

        res.status(401);
        throw new Error(user.lockUntil ? 'Account locked due to too many failed attempts' : 'Invalid email or password');
    }
};

module.exports = { registerUser, authUser };
