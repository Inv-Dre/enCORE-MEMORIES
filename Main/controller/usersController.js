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
            .populate('thoughts')
            .populate('friends');
           
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
              const valNewUser = await User.findOne({username: req.body.username})
              if (valNewUser){
              return res.status(400).json('Username already exists')
              }
                const dbUserData = await User.create(req.body);
                console.log(dbUserData)
                res.status(200).json("User Created");
            } catch (err){
                res.status(500).json(err);
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
                res.status(200).json("The User and their Thoughts have been deleted");
                // console.log(user)
                if(!user){
                  return res.status(404).json({ message: 'User not found'})
                }
                
            } catch (err) {
                res.status(500).json(err)
            }
          },
          async addFriend (req,res){
            try{
              const {userId, friendId} = req.params
              const user = await User.findOne({_id: userId});
              const newFriend = await User.findOne({_id: friendId});
              // console.log(user, newFriend)
             
              if (!user || !newFriend) {
                return res.status(404).json({ message: 'User or friend not found' });
              }
              user.friends.push(newFriend);
              await user.save();
        
              await res.status(200).json(user);
            }catch (err) {
              res.status(500).json(err);
          }
          },
          async deleteFriend (req,res){
            try{
              const {userId, friendId} = req.params;
            
              const user = await User.findOne({_id: userId});
              if(!user){
                return res.status(404).json({message:'user not found'})
              }
              const friendIndex = user.friends.indexOf(friendId);
              if (friendIndex === -1) {return res.json({message:'User not in Friends List'})}
              // const friend = await User.findOne({_id: friendId});

              console.log(user)
              console.log(friendIndex)

              user.friends.splice(friendIndex,1);
              user.save()
              res.status(200).json(user)

              // const removedFriend = await User.findOne({_id: friendId}

          
            // res.json(user);
            }catch (err) {
              res.json(err);
          }
          }
        };
