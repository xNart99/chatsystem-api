const authControler = require('../controllers/auth.controller');

const express = require("express");

const router = express.Router();
const authMiddleware = require('../middlewares/authorization');

router.post('/register', authMiddleware.isAuthenticated, authMiddleware.checkSupperAdminAndGroupAdmin,authControler.registerUser);
router.post('/login', authControler.loginUser);

module.exports = router;