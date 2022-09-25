const authControler = require('../controllers/auth.controller');

const express = require("express");

const router = express.Router();

router.post('/register', authControler.registerUser);
router.post('/login', authControler.loginUser);

module.exports = router;