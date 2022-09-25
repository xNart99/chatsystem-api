const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const hashPassword = async (plainPassword) => {
    return await bcrypt.hash(plainPassword, 10);
}

const generateToken = (user) => {
    return jwt.sign({
        username: user.username,
        role: user.role
    },
        config.AUTH_TOKEN_SECRET.ACCESS_TOKEN
    );
}

const checkPassword = (plainPassword, hash) => {
    return bcrypt.compare(plainPassword, hash);
}

module.exports = {
    hashPassword,
    generateToken,
    checkPassword
}