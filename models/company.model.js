
const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    region: { type: String },
    city: { type: String },
    state: { type: String },
    zone: { type: String },
    wereda: { type: String },
    kebele: { type: String },
    streetNumber: { type: String },
    houseNumber: { type: String },
    // subCity: { type: String },
    location : {
        lat: { type: String },
        long: { type: String }
    },
    gogglMapUrl : { type: String }
});

const licenceSchema = new mongoose.Schema({
    type: { type: String },
    url: { type: String }
})

const companySchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    logo : {
        url: { type: String },
        mime: { type: String },
        resolution: { type: String },
        uploadedAt: { type: Date }
    },
    licence : [ licenceSchema ],
    tel: [{
        type: { type: String },
        code: { type: String },
        number: { type: String },
    }],
    images: [{
        url: { type: String },
        mime: { type: String },
        resolution: { type: String },
        uploadedAt: { type: Date }
    }],
    fax: [{ type: String }],
    services: { type: String },
    social: {
        website : { type: String },
        email : { type: String },
        pobox: { type: String }
    },
    address: [ addressSchema ],
    slug: { type: String },
    approved: {
        status : { type: Boolean, default: false },
        at : { type: Date },
        by: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "staff"
        }
    }
})

module.exports = mongoose.model("company", companySchema);
