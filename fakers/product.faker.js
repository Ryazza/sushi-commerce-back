categories = require('./categories_data.json');
subCategories = require('./subCategories_data.json');
products = require('./products_data.json');

const res = require("express");
const index = require("../server");
const {log} = require("debug");
Lib = require('./lib.faker')

let saveId = []


Lib.pushCategories(categories)
    .then(r => Lib.exploitSaveId(r.saveId, subCategories))
    // .then(r => console.log("okay", r))
    .then(r => Lib.pushSubCategories(r))
    .then(r => Lib.changeProductsSubCategoryId(r.saveId, products))
    // .then(r => console.log('okay', r.saveId))
    .then(r => Lib.pushProducts(r)).catch(e => console.log(e))
    .then(r => process.exit())

// Lib.pushProducts(products).then(e=>console.log(e))

