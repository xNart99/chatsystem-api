const io = require('socket.io')(4000);
let socketio;
io.on('connection', (socket) => {
    socketio = socket;
 });

const sendMessage = (data) => {
    socketio.emit('send-message', data);
}

module.exports = {
    sendMessage
}