const mongoose = require("mongoose")

const staffSchema = new mongoose.Schema({
    username: { type: String },
    password: {
        oldPassword: { type: String },
        currentPassword: { type: String },
        salt: { type: String }
    },
    profile: {
        fullName:{
            firstName: { type: String },
            middleName: { type: String },
            lastName: { type: String }
        },
        gender: { type: String },
        bod: { type: Date },
        profile: {
            url: { type: String },
            mime: { type: String },
            resolution: { type: String },
            uploadedAt: { type: Date }            
        },
        address: {
            region: { type: String },
            city: { type: String },
            state: { type: String },
            zone: { type: String },
            wereda: { type: String },
            kebele: { type: String },
            streetNumber: { type: String },
            houseNumber: { type: String },         
        },
        tel: [{
            code: { type: String },
            number: { type: String }
        }]
    },
    role: { type: String, default: "Staff" },
    isActive: { type: Boolean, default: true }
},{
    timestamps: true
});

module.exports = mongoose.model("staff", staffSchema)