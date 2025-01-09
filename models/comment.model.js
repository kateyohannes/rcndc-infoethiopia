
const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    news: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "news"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    comment: {
        type: String
    },
    reaction: { 
        like: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
        dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
    },
    updatedComment: [{
        comment: { type: String },
        replacedAt: { type: Date }
    }],
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date }
});

module.exports = mongoose.model("comment", commentSchema)