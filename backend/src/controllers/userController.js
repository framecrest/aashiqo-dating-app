const User = require('../models/User');

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

const updateProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.bio = req.body.bio || user.bio;
        user.age = req.body.age || user.age;
        user.gender = req.body.gender || user.gender;
        user.height_cm = req.body.height_cm || user.height_cm;
        user.education = req.body.education || user.education;
        user.looking_for = req.body.looking_for || user.looking_for;
        user.interests = req.body.interests || user.interests;
        user.photos = req.body.photos || user.photos;

        if (req.body.location) {
            user.location = {
                city: req.body.location.city || user.location?.city,
                coordinates: req.body.location.coordinates || user.location?.coordinates
            };
        }

        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

const registerComplete = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const {
        name, gender, age, height_cm, education,
        interests, looking_for, bio, photos, location
    } = req.body;

    user.name = name;
    user.gender = gender;
    user.age = age;
    user.height_cm = height_cm;
    user.education = education;
    user.interests = interests;
    user.looking_for = looking_for;
    user.bio = bio;
    user.photos = photos;
    user.location = location;
    user.onboarded = true;

    const updatedUser = await user.save();
    res.json({
        message: 'Onboarding completed successfully',
        user: updatedUser
    });
};

const getDiscoverProfiles = async (req, res) => {
    // Get users that are not the current user and not already liked/matched
    const currentUserId = req.user._id;
    const user = await User.findById(currentUserId);

    const profiles = await User.find({
        _id: { $ne: currentUserId, $nin: [...user.likes, ...user.matches] },
    }).limit(50);

    res.json(profiles);
};

module.exports = { getUserProfile, updateProfile, getDiscoverProfiles, registerComplete };
