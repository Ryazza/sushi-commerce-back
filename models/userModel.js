const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UsersSchema  = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required:true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    address: [{
        no: Number,
        address: String,
        complement: String,
        cp: String,
        city: String,
        country: String,
        phone: String
    }],
    payment: {
        type: Array
    },
    createdAt : {
        type: Date,
        required: true
    },
    updateAt : {
        type: Date,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    }
});

UsersSchema.plugin(uniqueValidator);

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;
