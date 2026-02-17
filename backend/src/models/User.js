const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        height_cm: { type: Number },
        education: { type: String },
        looking_for: [{ type: String }],
        bio: { type: String },
        interests: [{ type: String }],
        photos: [{ type: String }],
        location: {
            city: { type: String },
            coordinates: {
                type: [Number],
                index: '2dsphere'
            }
        },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        onboarded: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
