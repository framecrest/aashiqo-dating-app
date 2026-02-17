const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        matchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Match',
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
