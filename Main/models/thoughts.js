const { Schema, model, Types} = require('mongoose');

const reactionsSchema = new Schema({
    reactionId: { 
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(), 
    },
    reactionBody: {
        type: String,
        required: true,
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
// {id:false,}
);

const thoughtsSchema = new Schema ({
    thoughtText: { 
        type: String,
        required: true,
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
    },
    
    reactions: [reactionsSchema],
      
},
{
    toJSON: {
        virtuals: true
    },
    id: false,
    timestamps: true,
    __v:false,
    
}
);

thoughtsSchema.path(`createdAt`).get(function(timestamps) {
    // Format the timestamp as you desire
    return timestamps.toLocaleString(); 
  });

thoughtsSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});


const Thought = model('thoughts', thoughtsSchema);

module.exports = Thought;