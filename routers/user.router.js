const express = require("express");

const router = express.Router();
const upload = require('../utils/upload');
const userController = require('../controllers/user.controller');

const authMiddleware = require('../middlewares/authorization');

router.put('/role',authMiddleware.isAuthenticated, authMiddleware.checkSupperAdminAndGroupAdmin,userController.updateRoleUser);
router.get('/', authMiddleware.isAuthenticated,userController.getAllUser);
router.put('/profile', authMiddleware.isAuthenticated,upload, userController.updateUser);
router.get('/profile', authMiddleware.isAuthenticated, userController.getUser);
router.get('/search', userController.getUserByUsername);
router.delete('/', authMiddleware.isAuthenticated, authMiddleware.checkSupperAdmin, userController.removeUser);
module.exports = router;