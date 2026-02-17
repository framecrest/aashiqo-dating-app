const mongoose = require('mongoose');

const matchSchema = mongoose.Schema(
    {
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
    },
    { timestamps: true }
);

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
