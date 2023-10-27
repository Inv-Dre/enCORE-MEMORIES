const router = require('express').Router();
const {
    getThoughts,
    oneThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction,
} = require('../../controller/thoughtsController');

router.route('/').get(getThoughts).post(createThought);

router
    .route('/:thoughtId')
    .get(oneThought)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(createReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;