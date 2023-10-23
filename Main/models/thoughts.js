const { Schema, model} = require('mongoose');

const thoughtsSchema = new Schema ({
    thoughtText: { 
        type: String,
        minLength: 1,
        maxLength: 500,
    },
    username: { 
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref:'reactions'
    }]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

thoughtsSchema.virtuals('reactionCount').get(function(){
    return this.reactions.length;
});

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;