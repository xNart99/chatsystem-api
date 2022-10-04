const jwt = require('jsonwebtoken');
const config = require('../config');
const isAuthenticated = async(req, res, next) => {
    try {
        const access_token = req.headers["authorization"].split(" ")[1];
        const user = jwt.verify(access_token, config.AUTH_TOKEN_SECRET.ACCESS_TOKEN);
        if (user) {
            req.user = user;
            return next();
        }
        return res.status(401).json({ message: 'user not exist' });
    } catch (err) {
        console.log(err);
        return res.status(401).json(err);
    }
}

const checkSupperAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== 'super') {
            return res.status(403).json({message: 'not have access'});
        }
        return next();
    }catch (error) {
        return res.status(500).json(error);
    }
}

const checkSupperAdminAndGroupAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== 'super' && user.role !== 'groupadmin') {
            return res.status(403).json({message: 'not have access'});
        }
        return next();
    }catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    isAuthenticated,
    checkSupperAdmin,
    checkSupperAdminAndGroupAdmin
}