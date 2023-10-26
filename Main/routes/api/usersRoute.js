const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controller/usersController');

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend);

module.exports = router;
