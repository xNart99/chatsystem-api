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



module.exports = {
    createGroup,
    getGroupById,
    updateGroup,
    addMemberToGroup
}