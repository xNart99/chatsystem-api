const groupService = require('../services/group.service');
const userService = require('../services/user.service');

const createGroup = async (req, res) => {
    try {
        const group = req.body;
        const checkGroup = await groupService.getGroupByName(group.name);
        if (checkGroup) {
            return res.status(400).json({message: "name exists!"});
        }
        const newGroup = await groupService.createGroup(group);
        return res.status(200).json({groupId: newGroup.id});
    }catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const getGroupById = async (req, res) =>{
    try {
        const {id} = req.params;
        const group = await groupService.getGroupById(id);
        return res.status(200).json(group);
    }catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const updateGroup = async (req, res) => {
    try {
        const group = req.body;
        await groupService.updateGroupById(group);
        return res.status(200).json({message: "successful!"});
    }catch(erorr) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const addMemberToGroup = async (req, res) => {
    try {
        const {groupId, memberUsername} = req.body;
        const user = await userService.getUserByUsername(memberUsername);
        if (!user) {
            return res.status(400).json({message: "user not exists!"});
        }
        const result = await groupService.checkUsernameInGroup(groupId, memberUsername);
        if(result) {
            return res.status(400).json({message: "username exists!"})
        }
        await groupService.addMemberToGroup(groupId, memberUsername);
        return res.status(200).json({message: "successful!"});
    }catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const removeMemberToGroup = async (req, res) => {
    try {
        const {groupId, memberUsername} = req.body;
        const user = await userService.getUserByUsername(memberUsername);

        if (!user) {
            return res.status(400).json({message: "user not exists!"});
        }
        const result = await groupService.checkUsernameInGroup(groupId, memberUsername);
        if(!result) {
            return res.status(400).json({message: "user not exists in group!"})
        }
        await groupService.removeMemberToGroup(groupId, memberUsername);
        return res.status(200).json({message: "successful!"});
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const getAllGroup = async (req, res) => {
    try {
        const groups = await groupService.getAllGroup();
        return res.status(200).json(groups);
    }catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const deleteGroup = async (req, res) => {
    try {
        const {groupId} = req.params;
        await groupService.deleteGroup(groupId);
        return res.status(200).json({message: "successful!"});
    }catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const createChannel = async (req, res) => {
    try {
        const channel = req.body;
        const {groupId} = req.params;
        const channelCheck = await groupService.getChannelByName(groupId, channel.name);
        if (channelCheck) {
            return res.status(400).json({message: "name of channel exists!"})
        }
        await groupService.createChannel(groupId,channel);
        return res.status(200).json({message: "successful!"});
    }catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const addUserToChannel = async (req, res) => {
    try {
        const {groupId, channelId} = req.params;
        const {username} = req.body;
        const user = await userService.getUserByUsername(username);
        if (!user) {
            return res.status(400).json({message: "user not exists!"});
        }
        const result = await groupService.addUserToChannel(groupId, channelId, username);
        if (result) {
            return res.status(200).json({message: "successful!"});
        }else {
            return res.status(400).json({message: "username exists!"})
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const removeUserFromChannel = async (req, res) => {
    try {
        const {groupId, channelId} = req.params;
        const {username} = req.body;
        const user = await userService.getUserByUsername(username);
        if (!user) {
            return res.status(400).json({message: "user not exists!"});
        }
        const result = await groupService.removeUserFormChannel(groupId, channelId, username);
        if (result) {
            return res.status(200).json({message: "successful!"});
        }else {
            return res.status(400).json({message: "username not exists!"})
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const getChannelById = async (req, res) => {
    try {
        const {groupId,channelId} = req.params;
        const channel = await groupService.getChannelById(groupId,channelId);
        return res.status(200).json(channel);
    }catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const deleteChannel = async (req, res) => {
    try {
        const {groupId,channelId} = req.params;
        await groupService.deleteChannel(groupId, channelId);
        return res.status(200).json({message: "successful!"});
    }catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const sendMessage = async (req, res) => {
    try {
        const {groupId,channelId} = req.params;
        const message = req.body;
        await groupService.createMessageToChannel(groupId, channelId, message);
        return res.status(200).json({message: "successful!"});
    }catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const sendMessageFile = async (req, res) => {
    try {
        const {groupId,channelId} = req.params;
        let message = req.body;
        message.content = req.file.path;
        message.createdAt = Number(message.createdAt);
        await groupService.createMessageToChannel(groupId, channelId, message);
        return res.status(200).json({message: "successful!"});
    }catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}
module.exports = {
    createGroup,
    getGroupById,
    updateGroup,
    addMemberToGroup,
    removeMemberToGroup,
    getAllGroup,
    deleteGroup,
    createChannel,
    addUserToChannel,
    removeUserFromChannel,
    getChannelById,
    deleteChannel,
    sendMessage,
    sendMessageFile
}