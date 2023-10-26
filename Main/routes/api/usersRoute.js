const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addFriend,
    deleteFriend,
    updateUser,
} = require('../../controller/usersController');

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend);

module.exports = router;
