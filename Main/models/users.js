const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
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
userSchema.pre('remove', async function (next) {
    try {
        await mongoose.model('thoughts').deleteMany({ userId: this._id });
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.virtual('friendsCount', function(){
    return this.friends.length;
});

const Users = model('users',  userSchema);

module.exports = Users;