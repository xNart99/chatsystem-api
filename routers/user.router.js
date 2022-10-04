const express = require("express");

const router = express.Router();
const upload = require('../utils/upload');
const userController = require('../controllers/user.controller');

const authMiddleware = require('../middlewares/authorization');

router.put('/role',authMiddleware.isAuthenticated, authMiddleware.checkSupperAdminAndGroupAdmin,userController.updateRoleUser);
router.get('/', authMiddleware.isAuthenticated,authMiddleware.checkSupperAdminAndGroupAdmin,userController.getAllUser);
router.put('/profile', authMiddleware.isAuthenticated,upload, userController.updateUser);

module.exports = router;