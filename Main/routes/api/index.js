const router = require('express').Router();
const usersRoute = require('./usersRoute');
const thoughtsRoute = require('./thoughtsRoute');

router.use('/users', usersRoute);
router.use('/thoughts', thoughtsRoute);


module.exports = router;