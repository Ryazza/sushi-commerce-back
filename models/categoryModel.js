const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    },{
        timestamps: true,
    });

CategorySchema.plugin(uniqueValidator);

const Order = mongoose.model('category', CategorySchema);

module.exports = Order;
