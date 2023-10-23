const { Schema, model} = require('mongoose');

const reactionsSchema = new Schema({
    reactionId: { 
        type: String,
    },
    createdAt: { 
        type: Date,
        default: Date.now,
    },
    _id: {
        type: String,
        required: true
    },
    reactionBody: {
        type: String,
        minLength: 1,
        maxLength: 250,
    },
    username: {
        type: String,
    }
},
{
    toJSON: {
        virtuals:false,
    },
    id: false,
});

const Reactions = model('reactions', reactionsSchema);

module.exports = Reactions;

