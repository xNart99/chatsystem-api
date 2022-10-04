const io = require('socket.io')(4000);

io.on('connection', (socket) => {
    socket.on('join', function(room) {
        socket.join(room);
    });
    socket.on('')
});

const sendMessage = (channelId, data) => {
    io.to(channelId).emit('send-message', data);
}

module.exports = {
    sendMessage
}