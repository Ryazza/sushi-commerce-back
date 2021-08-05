categories = require('./categories_data.json');
subCategories = require('./subCategories_data.json');
products = require('./products_data.json');

const res = require("express");
const index = require("../server");
const {log} = require("debug");
Lib = require('./lib.faker')



Lib.pushProducts(products).then(e=>console.log(e))

