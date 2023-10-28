const Thought = require('../models/thoughts');
const User = require('../models/users')

module.exports = {
    async getThoughts(req, res) { 
        try{
        const thoughts = await Thought.find();
        res.json(thoughts);
        } catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async oneThought(req,res) {
        try{
        const thought = await Thought.findById({_id: req.params.thoughtId})
        .select('-__v')
        .populate('reactions');

        if(!thought){
            return res.status(404).json({ message: 'No thought with that ID'})
        }
        await res.json(thought)
    } catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
    },
    async createThought (req,res){
        try{
            const {thoughtText, username} = req.body
          
            const user = await User.findOne({username: username});

            if(!user){
                return await res.status(404).json('User not found');
            } else {
            const thoughtData = await Thought.create({thoughtText, username}); 
            user.thoughts.push(thoughtData)
            await user.save()
            console.log(user);
            await res.status(200).json("Thought Created");
            }
        } catch (err){
            res.status(500).json(err);
        }
    },
    async deleteThought(req,res){
        try{
            const destroyThought = await Thought.deleteOne({_id: req.params.thoughtId})
            console.log(destroyThought)
            res.status(200).json('thought deleted');
        } catch (err){
            res.status(500).json(err);
        }
    },
    async updateThought(req,res){
        try{
            const thought = await Thought.updateOne({_id: req.params.thoughtId}, req.body)
            
            console.log(thought);
             await res.status(200).json('Thought Updated');

        }catch(err){
            res.status(500).json(err);
        }
    },

    async createReaction (req,res){
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            if(!thought){
              return res.status(404).json('thought not found')
            }
            const user = await User.findOne({username: req.body.username});

            if(!user){
                return  res.status(404).json('User not found')
            }

            const reaction = req.body

            thought.reactions.push(reaction)
            await thought.save()
        
            res.status(200).json('Reaction created');
        }catch (err){
            res.status(500).json(err)
        }
    },

    async deleteReaction(req,res){
        try{
            const {thoughtId, reactionId} = req.params
            const thought = await Thought.findOneAndUpdate({_id: thoughtId}, {$pull: {reactions: {reactionId}}},{runValidators:true, new:true,});
         
            if (!thought ){
              return  res.status(400).json('thought not found')
            }
            
          
            res.status(200).json(thought);
           
        }catch (err) {
            res.status(200).json(err);
        }
    },
};

