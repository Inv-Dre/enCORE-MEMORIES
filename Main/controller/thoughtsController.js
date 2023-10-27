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
            const thoughtData = await Thought.create({thoughtText, username});
            console.log(thoughtData);
            const user = await User.findOne({username: username});
            user.thoughts.push(thoughtData)
            await user.save()
            console.log(user);
            await res.send("Thought Created");
        } catch (err){
            res.send(err);
        }
    },
    async deleteThought(req,res){
        try{
            const destroyThought = await Thought.deleteOne({_id: req.params.thoughtId})
            console.log(destroyThought)
            res.send('thought deleted');
        } catch (err){
            res.send(err);
        }
    },
    async updateThought(req,res){
        try{
            const thought = await Thought.updateOne({_id: req.params.thoughtId}, req.body)
            
            console.log(thought);
             await res.send('Thought Updated');

        }catch(err){
            res.send(err);
        }
    },

    async createReaction (req,res){
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            if(!thought){
              return res.send('thought not found')
            }
            const reaction = req.body

            const newReaction = thought.reactions.push(reaction)
            thought.save()
            console.log(newReaction);
            res.send('Reaction created');
        }catch (err){
            res.send(err)
        }
    },

    async deleteReaction(req,res){
        try{
            const {thoughtId, reactionId} = req.params
            const thought = await Thought.findOneAndUpdate({_id: thoughtId}, {$pull: {reactions: {reactionId}}},{runValidators:true, new:true,});
         
            if (!thought ){
              return  res.send('thought not found')
            }
            
          
            res.json(thought);
           
        }catch (err) {
            res.send(err);
        }
    },
};

