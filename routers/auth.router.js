const authControler = require('../controllers/auth.controller');

const express = require("express");

const router = express.Router();

router.post('/register', authControler.registerUser);

module.exports = router;