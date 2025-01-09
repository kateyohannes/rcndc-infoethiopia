
const Subscription = require("../models/subscription.model")

module.exports = {
    getSubscriptions: async (req, res)=>{
        try{
            const data = await Subscription.find()
            return res.status(200).json(data)
        }catch(err){
            return res.status(500).json(err)
        }
    },
    getSubscription: async (req, res)=>{
        try{
            const { id } = req.params
            const data = await Subscription.findById(id)
            if(!data){
                return res.status(404).json({
                    message: "Subscription Not Found!"
                })
            }

            return res.status(200).json(data)
        }catch(err){
            return res.status(500).json(err)
        }
    },
    addSubscription:  async (req, res)=>{
        try{
            const body = req.body
            const data = await Subscription.create(body)
            if(!data){
                return res.status(404).json({
                    message: "Register Staff Failed!"
                });
            }

            return res.status(201).json({
                success: true, 
                data
            })
        }catch(err){
            return res.status(500).json(err)
        }
    },
    updateSubscription:  async (req, res)=>{
        try{
            return res.status(200).json({
                message: "update"
            })
        }catch(err){
            return res.status(500).json(err)
        }
    },
    deleteSubscription:  async (req, res)=>{
        try{
            const { id } = req.params
            const data = await Subscription.findByIdAndDelete(id)
            if(!data){
                return res.status(404).json({
                    message: "Subscription Delete Failed!"
                });
            }
            return res.status(200).json(data)
        }catch(err){
            return res.status(500).json(err)
        }
    }
}