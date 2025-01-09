
const mongoose = require("mongoose")

const contentSchema = new mongoose.Schema({
    language: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, rqequired: true },
    createdAt: { type: Date },
    isPublished: {
        status: { type: Boolean },
        reason: { type: String },
        by: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "staff"
        },
        at: { type: Date }
    }
});

const newsSchema = new mongoose.Schema({
    company: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "company"
    },
    slug: { type: String },
    coverImage: {
        url: { type: String },
        mime: { type: String },
        resolution: { type: String },
        uploadedAt: { type: Date }
    },
    content: [ contentSchema ],
    reaction: { 
        like: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
        dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
    },
    audiance: { type: String, default: "Public" } // Public, Subscribed
})

module.exports = mongoose.model("news", newsSchema);
