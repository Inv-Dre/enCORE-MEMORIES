const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}/
        },
        password: {
            type: String,
            required: true 
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
},
{
    toJSON: {
        virtuals: true,

    },
    id: false,
}
);

userSchema.virtuals('friendsCount', function(){
    return this.friends.length;
});

const Users = model('users',  userSchema);

module.exports = Users;