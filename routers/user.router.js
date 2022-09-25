const express = require("express");

const router = express.Router();
const userController = require('../controllers/user.controller');

router.put('/role', userController.updateRoleUser);



module.exports = router;