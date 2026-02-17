const User = require('../models/User');
const Match = require('../models/Match');

// @desc    Swipe on a user (like, pass, superlike)
// @route   POST /api/matches/swipe
// @access  Private
const swipeUser = async (req, res) => {
    const { targetUserId, action } = req.body; // action: 'like', 'pass', 'superlike'
    const currentUserId = req.user._id;

    if (!['like', 'pass', 'superlike'].includes(action)) {
        res.status(400);
        throw new Error('Invalid swipe action');
    }

    if (currentUserId.toString() === targetUserId) {
        res.status(400);
        throw new Error('Cannot swipe on yourself');
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
        res.status(404);
        throw new Error('User not found');
    }

    // Check if already swiped
    const alreadySwiped = currentUser.swipeHistory.find(
        (h) => h.userId.toString() === targetUserId
    );

    if (alreadySwiped) {
        res.status(400);
        throw new Error('You have already swiped on this profile');
    }

    // Record the swipe
    currentUser.swipeHistory.push({
        userId: targetUserId,
        action: action
    });

    let isMatch = false;
    let matchData = null;

    if (action === 'like' || action === 'superlike') {
        // Add to likes list for potentially faster querying later
        currentUser.likes.push(targetUserId);

        // Check for Mutual Like
        // We check if the target user has ALREADY liked the current user
        // We can check their 'likes' array or their swipeHistory
        const isMutual = targetUser.likes.includes(currentUserId);

        if (isMutual) {
            isMatch = true;

            // Create the Match Document
            matchData = await Match.create({
                users: [currentUserId, targetUserId]
            });

            // Update both users' match lists
            currentUser.matches.push(targetUserId);
            targetUser.matches.push(currentUserId);

            await targetUser.save();
        }
    }

    await currentUser.save();

    res.status(200).json({
        success: true,
        isMatch,
        match: matchData
    });
};

// @desc    Get all matches
// @route   GET /api/matches
// @access  Private
const getMatches = async (req, res) => {
    // Find all matches where the current user is a participant
    const matches = await Match.find({
        users: { $in: [req.user._id] }
    })
        .populate({
            path: 'users',
            select: 'name photos bio age gender', // Select specific fields
        })
        .populate({
            path: 'lastMessage',
            select: 'content sender createdAt read'
        })
        .sort({ updatedAt: -1 }); // Most recent matches/chats first

    // Format the response to make it easy for frontend
    const formattedMatches = matches.map(match => {
        // Find the "other" user
        const otherUser = match.users.find(u => u._id.toString() !== req.user._id.toString());

        // Safety check if other user is deleted
        if (!otherUser) return null;

        return {
            _id: match._id,
            userId: otherUser._id,
            name: otherUser.name,
            photo: otherUser.photos && otherUser.photos.length > 0 ? otherUser.photos[0] : null,
            age: otherUser.age,
            lastMessage: match.lastMessage,
            createdAt: match.createdAt
        };
    }).filter(m => m !== null); // Filter out nulls

    res.json(formattedMatches);
};

module.exports = { swipeUser, getMatches };
