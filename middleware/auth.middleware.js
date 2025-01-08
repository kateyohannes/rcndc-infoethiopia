
const jwt = require("jsonwebtoken")

module.exports = {
    verifyAuthentication: async (req, res, next)=>{
        const token = req.headers['authorization']?.split(" ")[1]
        if(!token){
            return res.status(401).json({
                message: "Token required!"
            })
        }

        const decode = jwt.decode(token)
        if(!decode){
            return res.status(401).json({
                message: "Invalid token!"
            })
        }

        req.user = decode;
        next()
    },
    checkRoles: (roles)=>{
        return (req, res, next)=>{
            const user = req.user    
            const role = user.role

            if(role && roles.includes(role)){
                return res.status(403).json({
                    message: "Not Autherized!"
                });
            }
    
            next()
        }
    }
}