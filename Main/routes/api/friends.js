const router = require('express').Router();
const {
    addFriends,
    deleteFriends,
} = require('../../controller/friendsController');

router
  .route('/:courseId')
  .put(addFriends)
  .delete(deleteFriends);

module.exports = router;
