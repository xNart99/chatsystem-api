const groupService = require('../services/group.service');

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

module.exports = {
    createGroup
}