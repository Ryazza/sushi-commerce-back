const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const OrderSchema = new mongoose.Schema({
    client_ID: {
        type: String,
        required: true,
    },
    articles: [
        {
            id: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            }
        },
    ],
    sendTo: {
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        address: {type: String, required: true},
        additionnal_adress: {type: String},
        postalCode: {type: Number, required: true},
        city: {type: String, required: true},
        country: {type: String, required: true},
        phone: {type: String, required: true},
    },
    shipping_fee: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    gift_package: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

OrderSchema.plugin(uniqueValidator);

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
