const { Schema, model} = require('mongoose');

const friendsSchema = new Schema({
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'friends',
    }],
    _id: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    }
},
{
    toJSON: {
        virtuals:true,
    },
    id: false,
});

friendsSchema.virtuals('friendCount', function(){
    return this.friends.length
});

const Friends = model('friends', friendsSchema);

module.exports = Friends;