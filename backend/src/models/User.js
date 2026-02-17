const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        // Core Identity
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        phone: { type: String, unique: true }, // Optional for OAuth users initially
        password: { type: String }, // Optional for OAuth users
        auth_provider: {
            type: String,
            enum: ['local', 'google', 'facebook', 'phone'],
            default: 'local'
        },

        // Profile Details
        age: { type: Number },
        gender: { type: String, enum: ['Male', 'Female', 'Non-binary', 'Other'] },
        height_cm: { type: Number },
        education: { type: String },
        profession: { type: String },
        looking_for: [{ type: String }],
        bio: { type: String, maxLength: 500 },
        interests: [{ type: String }],
        photos: [{ type: String }], // Max 6 enforced by api layer

        // Location
        location: {
            city: { type: String },
            coordinates: {
                type: { type: String, default: 'Point' },
                coordinates: { type: [Number], default: [0, 0] } // [long, lat]
            }
        },

        // Matching Engine
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        swipeHistory: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            action: { type: String, enum: ['like', 'pass', 'superlike'] },
            timestamp: { type: Date, default: Date.now }
        }],

        // Premium Features
        subscription_status: {
            type: String,
            enum: ['free', 'gold', 'platinum'],
            default: 'free'
        },
        subscription_expiry: { type: Date },

        // Security & Abuse Prevention
        onboarded: { type: Boolean, default: false },
        is_verified: { type: Boolean, default: false },
        blocked_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        reported_by: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            reason: String,
            timestamp: Date
        }],
        deviceSessions: [{
            deviceId: String,
            lastActive: Date,
            token: String
        }],
        loginAttempts: { type: Number, default: 0 },
        lockUntil: { type: Date }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);
module.exports = User;
