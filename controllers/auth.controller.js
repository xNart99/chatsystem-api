const authentication = require('../utils/authentication');

const userService = require('../services/user.service');

const registerUser = async (req, res) => {
    try {
        const user = req.body;
        const userCheck = await userService.findUserByUsernameOrEmail(user.username, user.email);
        if (userCheck) {
            return res.status(400).json({message: "username or email exists!"});
        }
        const newUser = await userService.createUser(user);
        const data = {
            username: newUser.username,
            email: newUser.email,
            profileImage: newUser.profileImage,
            role: newUser.role
        }
        return res.status(200).json(data);
    }catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const loginUser = async (req, res) => {
    try {
        const userLogin = req.body;
        const user = await userService.getUserByUsername(userLogin.username);
        const result = await authentication.checkPassword(userLogin.password, user.password);
        if (result) {
            return res.status(200).json({token: authentication.generateToken(user), role: user.role, username: user.username});
        }else {
            return res.status(400).json({message: "information login incorrect!"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

module.exports = {
    registerUser,
    loginUser
}