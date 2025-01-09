const mongoose = require("mongoose")

const subscriptionSchema = new mongoose.Schema({
    name: { type: String },
    type: { type: String },
    feature: [{ type: String }],
    price: { 
        amount: { type: Number },
        duration: { type: String },
    },
    offer: {
        percent: { type: Number },
        duration: { type: String },
    }
}, { 
    timestamps: true
})

module.exports = mongoose.model("subscription", subscriptionSchema)