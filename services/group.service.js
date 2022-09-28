const {Groups} = require('../models');
const {v4: uuidv4} = require('uuid');
const createGroup = async (group) => {
    group.id = uuidv4();
    const newGroup = await new Groups(group).save();
    return newGroup;
}

const getGroupById = async (groupId) => {
    const group = await Groups.findOne({id: groupId}, {
        _id: 0,
        __v: 0
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
    return true;
}

const addMemberToGroup = async (groupId, memberUsername) => {
    const group = await Groups.findOne({id: groupId});

    let arrayMember = group.members;

    arrayMember.push(memberUsername);

    group.members = arrayMember;

    updateGroupById(group);

    return true;

}

const removeMemberToGroup = async (groupId, memberUsername) => {
    const group = await Groups.findOne({id: groupId});

    let arrayMember = group.members;

    group.members = arrayMember.filter(item => item !== memberUsername);

    updateGroupById(group);

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
}

const addUserToChannel = async (groupId, channelId, username) => {
    const group = await getGroupById(groupId);
    for(let channel of group.channels) {
        if(channel.id === channelId) {
            channel.accessingUsers.push(username);
        }
    }
    await Groups.updateOne(
        {id: groupId},
        {
            $set: (group)
        }
    );
}

const removeUserFormChannel= async (groupId, channelId, username) => {
    const group = await getGroupById(groupId);
    for(let channel of group.channels) {
        if(channel.id === channelId) {
            const newUsers = channel.accessingUsers.filter(item !== username);
            channel.accessingUsers = newUsers;
        }
    }
    await Groups.updateOne(
        {id: groupId},
        {
            $set: (group)
        }
    );
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
    // console.log(group);
    // if (!group.channels){
    //     return null;
    // }
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
    )
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
    getChannelByName
}
