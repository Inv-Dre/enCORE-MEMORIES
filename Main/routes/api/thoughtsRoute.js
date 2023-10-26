const router = require('express').Router();
const {
    getThoughts,
    oneThought,
    createThought,
    deleteThought,
} = require('../../controller/thoughtsController');

router.route('/').get(getThoughts).put(createThought);

router
    .route('/:thoughtId')
    .get(oneThought)
    .delete(deleteThought);

module.exports = router;