
const mongoose = require("mongoose")

const catagorySchema = new mongoose.Schema({
    parent: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "catagory"
    },
    name: { type: String },
    slug: { type: String }
})

module.exports = mongoose.model("catagory", catagorySchema);
