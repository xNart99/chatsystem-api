const express = require("express");

const router = express.Router();
const upload = require('../utils/upload');
const groupController = require('../controllers/group.controller');
const authMiddleware = require('../middlewares/authorization');

router.post('/', authMiddleware.isAuthenticated, authMiddleware.checkSupperAdminAndGroupAdmin,groupController.createGroup);
router.get('/:id', groupController.getGroupById);
router.put('/', authMiddleware.isAuthenticated, authMiddleware.checkSupperAdminAndGroupAdmin,groupController.updateGroup);
router.post('/add-member', authMiddleware.isAuthenticated, authMiddleware.checkSupperAdminAndGroupAdmin, groupController.addMemberToGroup);
router.post('/remove-member', authMiddleware.isAuthenticated, authMiddleware.checkSupperAdminAndGroupAdmin,groupController.removeMemberToGroup);
router.get('/', groupController.getAllGroup);
router.delete('/:groupId',authMiddleware.isAuthenticated, authMiddleware.checkSupperAdminAndGroupAdmin, groupController.deleteGroup);
//channel
router.post('/:groupId/channels',authMiddleware.isAuthenticated, authMiddleware.checkSupperAdminAndGroupAdmin, groupController.createChannel);
router.post('/:groupId/channels/:channelId/add-member',authMiddleware.isAuthenticated, authMiddleware.checkSupperAdminAndGroupAdmin, groupController.addUserToChannel);
router.post('/:groupId/channels/:channelId/remove-member',authMiddleware.isAuthenticated, authMiddleware.checkSupperAdminAndGroupAdmin, groupController.removeUserFromChannel);
router.get('/:groupId/channels/:channelId', groupController.getChannelById);
router.delete('/:groupId/channels/:channelId',authMiddleware.isAuthenticated, authMiddleware.checkSupperAdminAndGroupAdmin, groupController.deleteChannel);
router.post('/:groupId/channels/:channelId/send-message', authMiddleware.isAuthenticated,groupController.sendMessage);
router.post('/:groupId/channels/:channelId/send-message-file', authMiddleware.isAuthenticated, upload, groupController.sendMessageFile);
module.exports = router;