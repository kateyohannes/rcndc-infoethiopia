const Staff = require("../models/Staff.model");
const { encrypt } = require("../utils/hash.js")

module.exports = {
    getStaffs: async (req, res)=>{
        try{
            const data = await Staff.find().select("-password");
            res.status(200).json(data);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getStaff: async (req, res)=>{
        try{
            const { id } = req.params;
            const data = await Staff.findById(id).select("-password");
            if(!data){
                return res.status(404).json({
                    message: "Staff Not Found!"
                });
            }
            
            return res.status(200).json(data);
        }catch(err){
            return res.status(500).json(err);
        }
    },
    addStaff: async (req, res)=>{
        try{
            const body = req.body;
            const { password } = body;
            
            const { hash, salt } = encrypt(password);
            const data = await Staff.create({
                ...body,
                password: {
                    currentPassword: hash,
                    salt
                }
            });

            if(!data){
                return res.status(404).json({
                    message: "Registered Staff Failed!"
                });
            }

            return res.status(201).json({
                success: true,
                data
            });
        }catch(err){
            return res.status(500).json(err);
        }
    },
    setProfile: async (req, res)=>{
        try{
            const { id } = req.params;
            const body = req.body;
            const Staff = await Staff.findOne({ _id: id })
            if(!Staff){
                return res.status(404).json({
                    message: "Staff Not Found!"
                })
            }

            Staff.profile = body
            const data = await Staff.save()
            return res.status(201).json(data)
        }catch(err){
            return res.status(500).json(err)
        }
    },
    deleteStaff: async (req, res)=>{
        try{
            const { id } = req.params;
            const data = await Staff.findByIdAndDelete(id);
            if(!data){
                return res.status(404).json({
                    message: "Staff Delete Failed!"
                });
            }
            return res.status(200).json(data);
        }catch(err){
            return res.status(500).json(err);
        }
    }
}
