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
            }
        },
    ]
},{
    timestamps: true,
});

OrderSchema.plugin(uniqueValidator);

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
