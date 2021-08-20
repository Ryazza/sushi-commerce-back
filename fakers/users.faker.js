const users = require('./users_data.json')
const index = require("../server");

const request = require("supertest");
const express = require("express");
const app = express();
const userController = require('../controllers/user.controller');
const ProductService = require("../services/product.service");

const UserService = require('../services/user.service')
users.forEach(async user =>  {
    try {
        let newUser = await UserService.addUser(user);
        if (newUser.success === true) {
            console.log("Success")
            // console.log(newProduct)
        } else {
            console.log("newUser failed")
        }

    } catch (e) {

        console.log(e)
    }

}).then(r =>process.exit())

