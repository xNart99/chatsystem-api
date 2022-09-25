const userService = require('../services/user.service');

const updateRoleUser = async (req, res) => {
    try {
        const user = req.body;
        await userService.updateRoleUser(user);
        return res.status(200).json({message: "successful!"});
    }catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        return res.status(200).json(users);
    }catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

module.exports = {
    updateRoleUser,
    getAllUser
}
