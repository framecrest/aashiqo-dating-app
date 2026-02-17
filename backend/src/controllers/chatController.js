const Message = require('../models/Message');

const getMessages = async (req, res) => {
    const { matchId } = req.params;

    const messages = await Message.find({ matchId }).sort({ createdAt: 1 });
    res.json(messages);
};

module.exports = { getMessages };
