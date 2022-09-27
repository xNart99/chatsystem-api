const express = require("express");

const router = express.Router();
const groupController = require('../controllers/group.controller');

router.post('/', groupController.createGroup);
router.get('/:id', groupController.getGroupById);
router.put('/', groupController.updateGroup);
router.post('/add-member', groupController.addMemberToGroup);
module.exports = router;