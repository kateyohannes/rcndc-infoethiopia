
const News = require("../models/news.model")

module.exports = {
    latestNews: async (req, res)=>{
        try{
            const data = await News.find()
            return res.status(200).json(data)
        }catch(err){
            return res.status(500).json(err)
        }
    },
    getNews: async (req, res)=>{
        try{
            const { id } = req.params
            const data = await News.findById(id)
            if(!data){
                return res.status(404).json({
                    message: "News Not Found!"
                })
            }
            return res.status(200).json(data)
        }catch(err){
            return res.status(500).json(err)
        }
    },
    AudioNodeNews: async (req, res)=>{
        try{
            const data = await News.find()
            return res.status(200).json(data)
        }catch(err){
            return res.status(500).json(err)
        }
    },
    latestNews: async (req, res)=>{
        try{
            const data = await News.find()
            return res.status(200).json(data)
        }catch(err){
            return res.status(500).json(err)
        }
    },
    latestNews: async (req, res)=>{
        try{
            const data = await News.find()
            return res.status(200).json(data)
        }catch(err){
            return res.status(500).json(err)
        }
    },

}