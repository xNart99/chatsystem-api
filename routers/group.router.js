const express = require("express");

const router = express.Router();
const upload = require('../utils/upload');
const groupController = require('../controllers/group.controller');

router.post('/', groupController.createGroup);
router.get('/:id', groupController.getGroupById);
router.put('/', groupController.updateGroup);
router.post('/add-member', groupController.addMemberToGroup);
router.post('/remove-member', groupController.removeMemberToGroup);
router.get('/', groupController.getAllGroup);
router.delete('/:groupId', groupController.deleteGroup);
//channel
router.post('/:groupId/channels', groupController.createChannel);
router.post('/:groupId/channels/:channelId/add-member', groupController.addUserToChannel);
router.post('/:groupId/channels/:channelId/remove-member', groupController.removeUserFromChannel);
router.get('/:groupId/channels/:channelId', groupController.getChannelById);
router.delete('/:groupId/channels/:channelId', groupController.deleteChannel);
router.post('/:groupId/channels/:channelId/send-message',groupController.sendMessage);
router.post('/:groupId/channels/:channelId/send-message-file', upload, groupController.sendMessageFile);
module.exports = router;