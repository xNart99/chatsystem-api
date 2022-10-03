const express = require("express");

const router = express.Router();
const upload = require('../utils/upload');
const userController = require('../controllers/user.controller');

router.put('/role', userController.updateRoleUser);
router.get('/', userController.getAllUser);
router.put('/profile', upload, userController.updateUser);

module.exports = router;