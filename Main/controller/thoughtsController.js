const Thoughts = require('../models/thoughts');
const User = require('../models/users')

module.exports = {
    async getThoughts(req, res) { 
        try{
        const thoughts = await Thoughts.find();
        res.json(thoughts);
        } catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async oneThought(req,res) {
        try{
        const thought = await Thoughts.findById({_id: req.params.userId})
        .select('-__v')
        .populate('reactions');

        if(!thought){
            return res.status(404).json({ message: 'No student with that ID'})
        }
    } catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
    },
    async createThought (req,res){
        try{
            const {thoughtsText, username} = req.body
            const thoughtData = await Thoughts.create({thoughtsText, username});
            console.log(thoughtData);
            const user = await User.findOne({username: username});
            await user.thoughts.push().save();
            console.log(user);
                res.send("Thought Created");
        } catch (err){
            res.json(500).json(err);
        }
    },
    async deleteThought(req,res){
        try{
            const destroyThought = await Thoughts.deleteOne({_id: req.params.thoughtId})
            console.log(destroyThought)
            res.send('thought deleted');
        } catch (err){
            res.json(500).json(err);
        }
    },
    async updateThought(req,res){
        try{
            const thought = await Thoughts.findOne({_id:req.params.thoughtId}) => {
                console.log(thought);  
            };
            console.log(thought);
            res.send('Thought Updated');

        }catch(err){
            res.json(500).json(err);
        }
    },

    async createReaction (req,res){
        try{
            const thought = await Thoughts.findOne({_id:req.params.thoughId})
            if(!thought){
               res.send('thought not found')
            }
            const reaction = req.body

            const newReaction = thought.reactions.push(reaction).save();
            console.log(newReaction);
            res.send('Reaction created');
        }catch (err){
            res.json(err)
        }
    },

    async deleteReaction(req,res){
        try{
            const {thoughtId, reactionId} = req.params
            const thought = await Thoughts.findOne({_id: thoughtId});
            const reaction = await Thoughts.findOne({_id:reactionId});
            if(!thought || !reaction){
                res.send('thought or reaction not found')
            }
            const deletedReaction = thought.reactions.splice(reaction);
            console.log(deletedReaction);
            res.send('reaction deleted');
           
        }catch (err) {
            res.status(500).json(err);
        }
    },
}

