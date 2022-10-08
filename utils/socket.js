const io = require('socket.io')(4000);

let ROOM_METTING = [];

io.on('connection', (socket) => {
    socket.on('join', function(room) {
        socket.join(room);
    });
    socket.on('join-room-metting', function(data) {
        console.log('b1');
        if (ROOM_METTING.filter(item => item.channelId === data.channelId).length === 0) {
            socket.broadcast.to(data.channelId).emit('notification-call-video', {channelId: data.channelId, channelName: data.channelName});
            // sendNotification(data);
            console.log('a');
            ROOM_METTING.push({
                channelId: data.channelId,
                usersApply: [data.username]
            });
        }else {
            console.log('b');
            socket.broadcast.to(data.channelId).emit('new-user-join', {username: data.username});
            for (let room of ROOM_METTING){
                if (room.channelId === data.channelId) {
                    room.usersApply.push(data.username);
                }
            }
        }
    });
    socket.on('leave', function(data) {
        
    })
});

const sendMessage = (channelId, data) => {
    io.to(channelId).emit('send-message', data);
}
const sendNotification = (data) => {
    io.broadcast.to(data.channelId).emit('notification-call-video', {channelId: channelId, channelName: data.channelName});
}
// const notificationCallVideo = (channelId) => {

// }

module.exports = {
    sendMessage
}