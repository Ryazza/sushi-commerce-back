const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {Schema} = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    subCategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'subCategory',
        required: true
    },
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
