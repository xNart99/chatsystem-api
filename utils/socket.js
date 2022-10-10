const io = require('socket.io')(4000);

let ROOM_METTING = [];

io.on('connection', (socket) => {
    socket.on('join', function(data) {
        socket.leave(data.channelOld);
        socket.join(data.channelId);
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
        ROOM_METTING = ROOM_METTING.filter(item => item.channelId !== data.channelId);
        socket.to(data.channelId).emit('user-end-call', {username: data.username});
    });
    socket.on("add-user", function(username) {
        socket.to(socket.id).emit("add-user-to-group-channel", {username});
    });
    socket.on("remove-user", function(username){
        console.log(username);
        socket.to(socket.id).emit("remove-user-to-group-channel", {username});
    })
});

const sendMessage = (channelId, data) => {
    io.to(channelId).emit('send-message', data);
}

const  sendUpdateGroupOrChannel = () => {
    io.emit("add-member-new-group-channel");
}

module.exports = {
    sendMessage,
    sendUpdateGroupOrChannel
}