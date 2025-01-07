const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
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
    restriction: [{
        type : { type: String },
        duration: {
            from: { type: Date },
            to: { type: Date }
        }
    }],
    isActive: { type: Boolean, default: true },
},{
    timestamps: true
});

module.exports = mongoose.model("user", userSchema)