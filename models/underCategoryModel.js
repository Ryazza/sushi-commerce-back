const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UnderCategorySchema = new mongoose.Schema({
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

UnderCategorySchema.plugin(uniqueValidator);

const Order = mongoose.model('underCategory', UnderCategorySchema);

module.exports = Order;
