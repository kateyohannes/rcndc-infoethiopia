
const mongoose = require("mongoose")

const adSchema = new mongoose.Schema({
    company: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "company"
    },
    position: { type: String },
    image: {
        url: { type: String },
        mime: { type: String },
        resolution: { type: String },
        uploadedAt: { type: Date }
    },
    duration: {
        startAt: { type: Date },
        endAt: { type: Date },
    },
    approved: {
        status: { type: Boolean },
        reason: { type: String },
        by: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "staff"
        },
        at: { type: Date }
    },
})

module.exports = mongoose.model("ad", adSchema);
