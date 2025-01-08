
const Joi = require("joi")

module.exports = {
    loginValidator : async (req, res, next)=>{
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        })

        const { error } = await schema.validateAsync(req.body)
        if(error){
            return res.status(500).json(err)
        }

        next()
    }
}