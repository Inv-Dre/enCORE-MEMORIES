const router = require('express').Router();
const {
    createReaction,
    deleteReaction,
} = require('../../controller/reactionsController');

router
  .route('/:friendId')
  .put(createReaction)
  .delete(deleteReaction);

module.exports = router;