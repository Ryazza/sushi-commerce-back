products     = require('./products_data.json');
const ProductService = require('../services/product.service')

console.log(products)

products.forEach(async user =>  {
    await ProductService.addProduct(user);
})