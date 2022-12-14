const {Users} = require('../models');
const authentication = require('../utils/authentication');

const createUser = async (user) => {
    try {
        user.password = await authentication.hashPassword(user.password);
        user.profileImage = 'https://res.cloudinary.com/awi-ln/image/upload/v1665074475/hinh-anh-avatar-de-thuong_g59cqn.jpg';
        const newUser = await new Users(user).save();
        return newUser;
    }catch (error) {
        console.log(error);
        return null;
    }
}

const updateRoleUser = async (user) => {
    try {
        await Users.updateOne(
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

const updateUser = async (user) => {
    await Users.updateOne(
        {username: user.username},
        {
            $set:(user)
        }
    );
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
            _id: 0,
            __v: 0
        });
        return user;
    }catch(error) {
        console.log(error);
        return null;
    }
}

const findUserByUsernameOrEmail = async(username, email) => {
    try {
        const user = await Users.findOne({$or: [
            {email: email},
            {username: username}
        ]});

        return user;
    } catch(error) {
        console.log(error);
        return null;
    }
}

const removeUserByUsername = async (username) => {
    await Users.findOne({username: username}).remove();
}

module.exports = {
    createUser,
    updateRoleUser,
    getAllUsers,
    getUserByUsername,
    findUserByUsernameOrEmail,
    updateUser,
    removeUserByUsername
}
