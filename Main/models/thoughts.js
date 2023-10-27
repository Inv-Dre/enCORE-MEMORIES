const { Schema, model, ObjectId} = require('mongoose');

const reactionsSchema = new Schema({
    reactionId: { 
        type: Schema.Types.ObjectId,
        default: new Object
    },
    reactionBody: {
        type: String,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: { 
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    }
},
);

const thoughtsSchema = new Schema ({
    thoughtText: { 
        type: String,
        minLength: 1,
        maxLength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: { 
        type: String,
        required: true,
    },
    
    reactions: [reactionsSchema],
      
},
{
    toJSON: {
        virtuals: true
    },
    id: false,
    timestamps: true,
}
);

thoughtsSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});


const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;