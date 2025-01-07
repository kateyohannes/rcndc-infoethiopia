
const Joi = require("joi")

module.exports = {
    registerUserValidator: async (req, res, next)=>{
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.email().required(),
            password: Joi.string().required()
        })

        const { error } = await schema.validateAsync(req.body)
        if(error){
            return res.status(400).json(error)
        }

        next()
    },
    setProfileValidator: async (req, res, next)=>{
        const schema = Joi.object({
            profile: {
                fullName: Joi.object({
                    firstName: Joi.string(),
                    middleName: Joi.string(),
                    lastName: Joi.string()
                }),
                gender: Joi.string(),
                bod: Joi.date(),
                profile: Joi.object({
                    url: Joi.string(),
                    mime: Joi.string(),
                    resolution: Joi.string(),
                    uploadedAt: Joi.date()            
                }),
                address: Joi.string({
                    region: Joi.string(),
                    city: Joi.string(),
                    state: Joi.string(),
                    zone: Joi.string(),
                    wereda: Joi.string(),
                    kebele: Joi.string(),
                    streetNumber: Joi.string(),
                    houseNumber: Joi.string(),         
                }),
                tel: Joi.array(
                    Joi.object({
                        code: Joi.string(),
                        number: Joi.string()
                    })
                )
            },
        });

        const { error } = await schema.validateAsync(req.body)

        if(error){
            return res.status(400).json(error)
        }

        next()
    }
}