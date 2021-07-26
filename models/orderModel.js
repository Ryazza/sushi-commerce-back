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
    card_ID: {
        type: String,
        required: true,
    },
    sendTo: {
        type: String,
        required: true
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
