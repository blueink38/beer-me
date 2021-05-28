const { Schema, model } = require('mongoose');

const brewerySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        breweryType: {
            type: String,
            required: true
        },
        street: {
            type: String,
            trim: true,
            default: ""
        },
        address2: {
            type: String,
            default: ""
        },
        address3: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        countyProvince: {
            type: String,
            default: ""
        },
        postalCode: {
            type: String,
            default: ""
        },
        country: {
            type: String,
            default: ""
        },
        longitude: {
            type: String,
            default: ""
        },
        latitude: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            unique: true,
            default: ""
        },
        websiteUrl: {
            type: String,
            unique: true,
            default: ""
        },
    }
)

const Brewery = model('Brewery', brewerySchema);

module.exports = Brewery;