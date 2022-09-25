const authentication = require('../utils/authentication');

const userService = require('../services/user.service');

const registerUser = async (req, res) => {
    try {
        const user = req.body;
        await userService.createUser(user);
        return res.status(200).json({message: "successful!"});
    }catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

module.exports = {
    registerUser
}