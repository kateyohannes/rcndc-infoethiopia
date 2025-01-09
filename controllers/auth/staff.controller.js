
const Staff = require("../../models/staff.model");
const jwt = require("jsonwebtoken")
const { isMatch } = require("../../utils/hash")

module.exports = {
    authStaff: async (req, res)=>{
        try{
            const body = req.body;
            const staff = await Staff.findOne({
                username : body.username
            });
       
            if(!staff){
                return res.satus(401).json({
                    message: "Unauthorized: Username"
                })
            }
            const ok = isMatch(body.password, staff.password);
            
            if(!ok){
                return res.satus(401).json({
                    message: "Unauthorized: Password"
                })
            }
            
            const payload = { 
                _id: staff._id, 
                username: staff.username,
                role: staff.role
            }

            const privateKey = process.env.JWT_SECRET || "0a9dsf0a9sduf09audsd90fu9adsuf90a099fusa09dfu0as9udf"
            const token = jwt.sign(
                payload, 
                privateKey
            );

            return res.status(201).json({
                success: true,
                token
            });
        }catch(err){
            return res.status(500).json(err);
        }
    }
}