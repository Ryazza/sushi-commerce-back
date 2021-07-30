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

/**
 * @action Defined Schema Virtual
 * @keys
 *    1.   The first parameter can be named anything.
 *          It defines the name of the key to be named on the Schema
 *
 *    2. Options Object
 *       ref: Model name for Child collection
 *       localField: Key for reference id, stored on Child Doc, as named on Parent Doc.
 *       foreignField: Key name that holds localField value on Child Document
 */
// UnderCategorySchema.virtual('subCategoriesProducts', {
//     ref: 'products', //The Model to use
//     localField: '_id', //Find in Model, where localField
//     foreignField: 'subCategoryId', // is equal to foreignField
// });
//
// // Set Object and Json property to true. Default is set to false
// UnderCategorySchema.set('toObject', { virtuals: true });
// UnderCategorySchema.set('toJSON', { virtuals: true });

UnderCategorySchema.plugin(uniqueValidator);

const Order = mongoose.model('subCategory', UnderCategorySchema);

module.exports = Order;
