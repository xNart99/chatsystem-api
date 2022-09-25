const {Users} = require('../models');
const authentication = require('../utils/authentication');

const createUser = async (user) => {
    try {
        user.password = await authentication.hashPassword(user.password);
        await new Users(user).save();
        return true;
    }catch (error) {
        console.log(error);
        return false;
    }
}

const updateRoleUser = async (user) => {
    try {
        const user = await Users.updateOne(
            {username: user.username},
            {
                $set:({role: user.role})
            }
        );
        return true;

    }catch(error) {
        console.log(error);
        return false;
    }
}


const getAllUsers = async () => {
    try {
        const users = await Users.find({},{
            password: 0,
            _id: 0,
            __v: 0
        });

        return users;

    }catch(error) {
        console.log(error);
        return null;
    }
}

const getUserByUsername = async (username) => {
    try {
        const user = await Users.findOne({username: username}, {
            password: 0,
            _id: 0,
            __v: 0
        });
        return user;
    }catch(error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createUser,
    updateRoleUser,
    getAllUsers,
    getUserByUsername
}
