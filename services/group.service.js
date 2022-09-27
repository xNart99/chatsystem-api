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

    let arrayMember = group.menbers;

    arrayMember.push(memberUsername);

    group.menbers = arrayMember;

    updateGroupById(group);

    return true;

}

const removeMemberToGroup = async (groupId, memberUsername) => {
    const group = await Groups.findOne({id: groupId});

    let arrayMember = group.menbers;

    group.menbers = arrayMember.filter(item => item !== memberUsername);

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
module.exports = {
    createGroup,
    getAllGroup,
    getGroupById,
    updateGroupById,
    removeMemberToGroup,
    addMemberToGroup,
    deleteGroup,
    getGroupByName
}
