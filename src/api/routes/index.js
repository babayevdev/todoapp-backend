const router = require('express').Router();
const taskRouter = require('./taskRouter');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const auth = require('../middlewares/auth');

// api endpoints in which we don't need to authenticate
router.use('/auth', authRouter);

// authentication middleware
router.use(auth);

// api
router.use('/task', taskRouter);
router.use('/user', userRouter);

module.exports = router;