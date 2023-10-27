const User = require('../models/users');

module.exports = {
    async getUsers( req, res) {
        try{
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req,res){
        try{
            const user = await User.findOne({ _id: req.params.userId})
            .select('-__v')
            .populate('thoughts','friends');
           
            console.log(user)
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
              }
        
              await res.json(user);
            } catch (err) {
             await res.status(500).json(err);
            }
          },
          async createUser(req,res) {
            try {
                const dbUserData = await User.create(req.body);
                console.log(dbUserData)
                res.send("User Created");
            } catch (err){
                res.send(err);
            }
          },
          async updateUser(req,res){
            try{
              const user = await User.updateOne({_id: req.params.userId}, req.body)
              console.log(user);
               await res.send('User Updated');
            }catch (err){
              res.send(err)
          }
          },
          async deleteUser(req,res) {
            try {
                const user = await User.deleteOne({ _id: req.params.userId})
                // console.log(user)
                if(!user){
                  return res.status(404).json({ message: 'User not found'})
                }
                await user.remove();
                await res.json("The User and their Thoughts have been deleted");
            } catch (err) {
                res.send(err)
            }
          },
          async addFriend (req,res){
            try{
              const {userId, friendId} = req.params
              const user = await User.findOne({_id: userId});
              const newFriend = await User.findOne({_id: friendId});
              // console.log(user, newFriend)
             
              if (!user || !newFriend) {
                return res.send({ message: 'User or friend not found' });
              }
              user.friends.push(newFriend);
              const save = await user.save();
              console.log(save)
            
              
              await res.send('Friend Added');
            }catch (err) {
              res.send(err);
          }
          },
          async deleteFriend (req,res){
            try{
              const {userId, friendId} = req.params;
              
              const user = await User.findOne({_id: userId});
              const removedFriend = await User.findOne({_id: friendId});
              
              if (!user || !removedFriend) {
                return res.send({ message: 'User or friend not found' });
              }

            const result = user.friends.splice(removedFriend);
            console.log(result);
            const  save = await user.save();
            console.log(save);
            await res.send('Friend Deleted');
            }catch (err) {
              res.send(err);
          }
          }
        };
