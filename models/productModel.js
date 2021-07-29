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
        type: Object
    },
    createdAt: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    views: {
        type: Number
    },
    price: {
      type: Number,
      required:true
    }
});

ProductsSchema.plugin(uniqueValidator);

const Products = mongoose.model('products', ProductsSchema);

module.exports = Products;
