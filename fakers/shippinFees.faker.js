shippingFee = require('./shippingfees_data.json');

const res = require("express");
const index = require("../server");
const {log} = require("debug");
Lib = require('./lib.faker')

let saveId = []


Lib.pushShippingFees(shippingFee)
    .then(r => console.log( r)).then(r =>process.exit())
    // .then(r => console.log('okay', r.saveId))


// Lib.pushProducts(products).then(e=>console.log(e))

