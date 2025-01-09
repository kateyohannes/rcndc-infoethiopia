
const Joi = require("joi")

module.exports = {
    addCommentValidator: async (req, res, next)=>{
        const schema = Joi.object({
            comment: Joi.string().required()
        })

        const { error } = await schema.validateAsync(req.body)
        if(error){
            return res.status(500).json(err)
        }

        next()
    },
    updateCommentValidator: async (req, res, next)=>{
        const schema = Joi.object({
            comment: Joi.string().required()
        })

        const { error } = await schema.validateAsync(req.body)
        if(error){
            return res.status(500).json(err)
        }

        next()
    }
}