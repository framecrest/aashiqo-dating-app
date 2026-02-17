const Message = require('../models/Message');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('join_chat', (matchId) => {
            socket.join(matchId);
            console.log(`User joined Chat: ${matchId}`);
        });

        socket.on('send_message', async (data) => {
            const { matchId, sender, receiver, text } = data;

            const newMessage = await Message.create({
                matchId,
                sender,
                receiver,
                text
            });

            io.to(matchId).emit('receive_message', newMessage);
        });

        socket.on('typing', (data) => {
            socket.to(data.matchId).emit('typing_status', data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};
