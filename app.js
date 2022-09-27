const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (req, res) => res.status(200).send('chat system api!'));

// router
const authRouter = require('./routers/auth.router');
app.use('/api/auth', authRouter);

const userRouter = require('./routers/user.router');
app.use('/api/users', userRouter);

const groupRouter = require('./routers/group.router');
app.use('/api/groups', groupRouter);
module.exports = app;