const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const { model } = require('mongoose');

const hashPassword = async (plainPassword) => {
    return await bcrypt.hash(plainPassword, 10);
}

const generateToken = () => {
    return jwt.sign({
        id: user_id,
        maLoaiNguoiDung: maLoaiNguoiDung
    },
        config.AUTH_TOKEN_SECRET.ACCESS_TOKEN
    );
}

const checkPassword = (plainPassword, hash) => {
    return bcrypt.compareSync(plainPassword, hash);
}

module.exports = {
    hashPassword,
    generateToken,
    checkPassword
}