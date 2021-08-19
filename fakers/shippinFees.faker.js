shippingFee = require('./shippingFee_data.json');

const res = require("express");
const index = require("../server");
const {log} = require("debug");
Lib = require('./lib.faker')

let saveId = []


Lib.pushCategories(shippingFee)
    .then(r => Lib.exploitSaveId(r.saveId, subCategories))
    // .then(r => console.log("okay", r))
    .then(r => Lib.pushSubCategories(r))
    .then(r => Lib.changeProductsSubCategoryId(r.saveId, products) )
    // .then(r => console.log('okay', r.saveId))
    .then(r=>Lib.pushProducts(r)).catch(e=>console.log(e));


// Lib.pushProducts(products).then(e=>console.log(e))

console.log("fin du script")