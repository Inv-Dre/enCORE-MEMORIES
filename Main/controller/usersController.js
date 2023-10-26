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

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
              }
        
              res.json(user);
            } catch (err) {
              res.status(500).json(err);
            }
          },
          async createUser(req,res) {
            try {
                const dbUserData = await User.create(req.body);
                console.log(dbUserData)
                res.send("User Created");
            } catch (err){
                res.json(500).json(err);
            }
          },
          async updateUser(req,res){
            try{
              const user = await User.updateOne({_id:req.params.userId})
              console.log(user);
              res.send('User Updated');
            }catch (err){
              res.status(500).json(err)
          }
          },
          async deleteUser(req,res) {
            try {
                const user = await User.deleteOne({ _id: req.params.userId})
                console.log(user)
                
                if(!user){
                  return res.status(404).json({ message: 'User not found'})
                }
                await user.remove();
                res.send('The User and their Thoughts have been deleted');
            } catch (err) {
                res.status(500).json(err)
            }
          },
        };
