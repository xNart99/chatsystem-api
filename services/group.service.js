const {Groups} = require('../models');
const {v4: uuidv4} = require('uuid');
const socketIO = require('../utils/socket');
const createGroup = async (group) => {
    group.id = uuidv4();
    const newGroup = await new Groups(group).save();
    return newGroup;
}

const getGroupById = async (groupId) => {
    const group = await Groups.findOne({id: groupId}, {
        _id: 0,
        __v: 0,
        "channels._id": 0
    });
    return group;
}

const updateGroupById = async (group) => {
    await Groups.updateOne(
        {id: group.id},
        {
            $set: (group)
        }
    );
    socketIO.sendUpdateGroupOrChannel();
    return true;
}

const addMemberToGroup = async (groupId, memberUsername) => {
    const group = await Groups.findOne({id: groupId});

    let arrayMember = group.members;

    arrayMember.push(memberUsername);

    group.members = arrayMember;

    updateGroupById(group);
    socketIO.sendUpdateGroupOrChannel();

    return true;

}

const removeMemberToGroup = async (groupId, memberUsername) => {
    const group = await Groups.findOne({id: groupId});

    let arrayMember = group.members;

    group.members = arrayMember.filter(item => item !== memberUsername);

    if(group.channels.length > 0) {
        for(let channel of group.channels) {
            if (channel.accessingUsers.includes(memberUsername)) {
                channel.accessingUsers = channel.accessingUsers.filter(item => item !== memberUsername);
            }
        }
    }

    updateGroupById(group);
    socketIO.sendUpdateGroupOrChannel();
    return true;
}

const getAllGroup = async () => {
    const groups = await Groups.find({}, {
        _id: 0,
        __v: 0
    });
    return groups;
}

const deleteGroup = async (groupId) => {
    const group = await Groups.findOne({id: groupId});
    await group.remove();
    socketIO.sendUpdateGroupOrChannel();
    return true;
}

const getGroupByName = async (groupName) => {
    const group = await Groups.findOne({name: groupName});

    return group;
}

const checkUsernameInGroup = async (groupId,username) => {
    const group = await Groups.findOne({id: groupId});
    const arrayMember = group.members;
    return arrayMember.includes(username);
}

const createChannel = async (groupId, channel) => {
    const group = await Groups.findOne({id: groupId});
    channel.id = uuidv4();
    group.channels.push(channel);
    await Groups.updateOne(
        {id: groupId},
        {
            $set: ({channels: group.channels})
        }
    );
    socketIO.sendUpdateGroupOrChannel();
    return channel.id;
}

const addUserToChannel = async (groupId, channelId, username) => {
    const group = await getGroupById(groupId);
    for(let channel of group.channels) {
        if(channel.id === channelId) {
            if (channel.accessingUsers.includes(username)){
                return false;
            }
            channel.accessingUsers.push(username);
        }
    }
    await Groups.updateOne(
        {id: groupId},
        {
            $set: (group)
        }
    );
    socketIO.sendUpdateGroupOrChannel();
    return true;
}

const removeUserFormChannel= async (groupId, channelId, username) => {
    const group = await getGroupById(groupId);
    for(let channel of group.channels) {
        if(channel.id === channelId) {
            if (!channel.accessingUsers.includes(username)){
                return false;
            }
            const newUsers = channel.accessingUsers.filter(item => item !== username);
            channel.accessingUsers = newUsers;
        }
    }
    await Groups.updateOne(
        {id: groupId},
        {
            $set: (group)
        }
    );
    socketIO.sendUpdateGroupOrChannel();
    return true;
}

const getChannelById = async (groupId, channelId) => {
    const group = await getGroupById(groupId);
    for(let channel of group.channels) {
        if (channel.id === channelId) {
            return channel;
        }
    }
}

const getChannelByName = async (groupId, nameChannel) => {
    const group = await getGroupById(groupId);
    for(let channel of group.channels) {
        if (channel.name === nameChannel) {
            return channel;
        }
    }
    return null;
}
const deleteChannel = async (groupId, channelId) => {
    const group = await getGroupById(groupId);
    const newChannels = group.channels.filter(item => item.id !== channelId);
    await Groups.updateOne(
        {id: groupId},
        {
            $set: ({channels: newChannels})
        }
    );
    socketIO.sendUpdateGroupOrChannel();
}

const createMessageToChannel = async (groupId, channelId, message) => {
    message.id = uuidv4();
    const group = await getGroupById(groupId);
    for(let channel of group.channels) {
        if (channel.id === channelId) {
            socketIO.sendMessage(channelId, message);
            channel.messages.push(message);
        }
    }
    await Groups.updateOne(
        {id: groupId},
        {
            $set: (group)
        }
    )
}

const deleteUserOnGroups = async (memberUsername) => {
    const groups = await Groups.find();
    for (let group of groups) {

        let arrayMember = group.members;

        group.members = arrayMember.filter(item => item !== memberUsername);

        if(group.channels.length > 0) {
            for(let channel of group.channels) {
                if (channel.accessingUsers.includes(username)) {
                    channel.accessingUsers = channel.accessingUsers.filter(item => item !== memberUsername);
                }
            }
        }

        updateGroupById(group);
        socketIO.sendUpdateGroupOrChannel();
        return true;
    }
}
module.exports = {
    createGroup,
    getAllGroup,
    getGroupById,
    updateGroupById,
    removeMemberToGroup,
    addMemberToGroup,
    deleteGroup,
    getGroupByName,
    checkUsernameInGroup,
    createChannel,
    createChannel,
    addUserToChannel,
    removeUserFormChannel,
    getChannelById,
    deleteChannel,
    getChannelByName,
    createMessageToChannel,
    deleteUserOnGroups
}
