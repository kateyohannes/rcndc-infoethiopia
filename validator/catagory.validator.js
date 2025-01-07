
const Joi = require("joi");

module.exports = {
    addCatagoryValidator: async (req, res, next)=>{
        const schema = Joi.object({
            name: Joi.string().required(),
            parent: Joi.string().optional()
        })

        const { error } = await schema.validateAsync(req.body);
        if(error){
            return res.status(400).json(error)
        }

        next()
    },
    updateCatagoryValidator: async (req, res, next)=>{
        const schema = Joi.object({
            name: Joi.string().optional(),
            parent: Joi.string().optional()
        })

        const { error } = await schema.validateAsync(req.body);
        if(error){
            return res.status(400).json(error)
        }

        next()
    }
}