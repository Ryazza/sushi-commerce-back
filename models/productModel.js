const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pictures: {
        type: Array
    },
    events: {
        type: Array
    },
    createdAt: {
        type: Date,
        required: true
    },
    stock: {
        type: Array,
        required: true

    },
    views: {
        type: Number

    }
});

ProductsSchema.plugin(uniqueValidator);

const Products = mongoose.model('products', ProductsSchema);

module.exports = Products;
