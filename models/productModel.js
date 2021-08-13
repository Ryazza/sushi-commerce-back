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
    brand: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    bigPicture: {
        type: String,
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
    weight: {
        type: Number
    },
    price: {
      type: Number,
      required:true
    },
    sale: {
        type: Number,
    },
    comment: [{
        title: {
            type: String,
        },
        content: {
            type: String,
        }
    }]
});

ProductsSchema.plugin(uniqueValidator);

const Products = mongoose.model('products', ProductsSchema);

module.exports = Products;
