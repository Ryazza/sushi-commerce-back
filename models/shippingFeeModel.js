const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {isArray} = require("core-util-is");

const ShippingFeeSchema = new mongoose.Schema({
    country: {
        type: [],
        required: true
    },
    type: {
        type: String,
        required: true
    },
    delay: {
        type: Number,
        required: true
    },
    weight: [{
        name: String,
        value: Number
    }]
});

ShippingFeeSchema.plugin(uniqueValidator);

const shippingFee = mongoose.model('shippingfees', ShippingFeeSchema);

module.exports = shippingFee;
