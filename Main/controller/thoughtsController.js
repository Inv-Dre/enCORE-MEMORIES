const Thoughts = require('../models/thoughts');

module.exports = {
    async getThoughts(req, res) { 
        try{
        const thoughts = Thoughts.find();
        res.json(thoughts);
        } catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async oneThought(req,res) {
        try{
        const thought = Thoughts.findById({_id: req.params.userId})
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
            const thoughtData = Thoughts.create(req.body)
            console.log(thoughtData)
                res.send("Thought Created");
        } catch (err){
            res.json(500).json(err);
        }
    },
    async deleteThought(req,res){
        try{
            const destroyThought = Thoughts.deleteOne({_id: req.params.thoughtId})
            console.log(destroyThought)
            res.send('thought deleted');
        } catch (err){
            res.json(500).json(err);
        }
    },

}