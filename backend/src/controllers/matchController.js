const User = require('../models/User');
const Match = require('../models/Match');

const likeUser = async (req, res) => {
    const { likedUserId } = req.body;
    const currentUserId = req.user._id;

    const currentUser = await User.findById(currentUserId);
    const likedUser = await User.findById(likedUserId);

    if (!likedUser) {
        res.status(404);
        throw new Error('User not found');
    }

    // Add to likes if not already there
    if (!currentUser.likes.includes(likedUserId)) {
        currentUser.likes.push(likedUserId);
        await currentUser.save();
    }

    // Check if mutual like
    if (likedUser.likes.includes(currentUserId)) {
        // Create Match
        const match = await Match.create({
            users: [currentUserId, likedUserId]
        });

        currentUser.matches.push(likedUserId);
        likedUser.matches.push(currentUserId);

        await currentUser.save();
        await likedUser.save();

        return res.status(201).json({ isMatch: true, match });
    }

    res.json({ isMatch: false });
};

const getMatches = async (req, res) => {
    const matches = await Match.find({
        users: { $in: [req.user._id] }
    }).populate('users', 'name photos bio');

    // Filter out current user from the populated users in each match
    const filteredMatches = matches.map(match => {
        const otherUser = match.users.find(u => u._id.toString() !== req.user._id.toString());
        return {
            _id: match._id,
            otherUser,
            createdAt: match.createdAt
        };
    });

    res.json(filteredMatches);
};

module.exports = { likeUser, getMatches };
