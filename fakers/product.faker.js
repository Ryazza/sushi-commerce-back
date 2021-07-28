products     = require('./products_data.json');
const ProductService = require('../services/product.service')
const res = require("express");
const index = require("../server");

// console.log(products)

products.forEach(async product =>  {
    try {
        let newProduct = await ProductService.addProduct(product)
        if (newProduct.success === true) {
            console.log("Success")
            // console.log(newProduct)
        } else {
            console.log("newProduct failed")
        }

    } catch (e) {

        console.log(e)
    }
})

