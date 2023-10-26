const Reactions = require('../models/reactions')

module.exports = {
    async createReaction(req,res){
        try {
            const reaction = Reactions.create(req.body)
            console.log(reaction)
            res.send('reaction created');
        } catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteReaction(req, res){
        try{
            const destroyReaction = Reactions.deleteOne({ _id: req.params.reactionId})
            console.log(destroyReaction)
            res.send('reaction deleted')
        } catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    }
}