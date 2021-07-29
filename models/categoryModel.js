const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CategorySchema = new mongoose.Schema({
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
CategorySchema.virtual('booksPublished', {
    ref: 'underCategory', //The Model to use
    localField: '_id', //Find in Model, where localField
    foreignField: 'parent', // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });

CategorySchema.plugin(uniqueValidator);

const Order = mongoose.model('category', CategorySchema);

module.exports = Order;
