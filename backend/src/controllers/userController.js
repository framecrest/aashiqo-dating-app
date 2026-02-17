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
    const currentUserId = req.user._id;
    const user = await User.findById(currentUserId);

    // Get list of users already swiped on (liked, passed, or superliked)
    const swipedUserIds = user.swipeHistory.map(h => h.userId);

    const profiles = await User.find({
        _id: {
            $ne: currentUserId,
            $nin: [...swipedUserIds, ...user.matches]
        },
        onboarded: true // Only show fully onboarded users
    })
        .select('-password -__v -swipeHistory -deviceSessions') // Exclude sensitive/heavy fields
        .limit(20);

    res.json(profiles);
};

const uploadPhoto = async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No image file provided');
    }

    const user = await User.findById(req.user._id);

    if (user.photos.length >= 6) {
        res.status(400);
        throw new Error('Max 6 photos allowed');
    }

    // Cloudinary URL is available in req.file.path
    user.photos.push(req.file.path);
    await user.save();

    res.json({
        message: 'Photo uploaded successfully',
        photoUrl: req.file.path,
        photos: user.photos
    });
};

module.exports = {
    getUserProfile,
    updateProfile,
    getDiscoverProfiles,
    registerComplete,
    uploadPhoto
};
