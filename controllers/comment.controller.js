
const News = require("../models/news.model")
const Comment = require("../models/comment.model")

module.exports = {
    getComment: async (req, res)=>{
        try{
            const { id } = req.params
            const data = await Comment.find({
                news : id
            })

            return res.status(200).json(data)
        }catch(err){
            return res.status(500).json(err)
        }
    },
    addComment: async (req, res)=>{
        try{
            const body = req.body
            const { id } = req.params
            const news = await News.findById(id)
            if(!news){
                return res.status(404).json("News Not Found!")
            }

            const data = await Comment.create({
                comment: body.comment,
                news: news._id
            }) 

            return res.status(201).json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json(err)
        }
    },
    updateComment: async (req, res)=>{
        try{

        }catch(err){
            return res.status(500).json(err)
        }
    },
    likeComment: async (req, res)=>{
        try{

        }catch(err){
            return res.status(500).json(err)
        }
    },
    dislikeComment: async (req, res)=>{
        try{

        }catch(err){
            return res.status(500).json(err)
        }
    },
    deleteComment: async (req, res)=>{
        try{
            const { id } = req.params
            const data = await Comment.findByIdAndUpdate(id, {
                isDelete: true
            });
            return res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json(err)
        }
    }
}