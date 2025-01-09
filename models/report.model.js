
const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({
    news : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "news"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    type: { type: String },
    reason: { type: String },
    reportedAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model("report", reportSchema)
