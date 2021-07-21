const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

//routes for user and all
router.get('/', ProductController.getProducts)
router.get('/{id}', ProductController.getProduct)

//admin user routes
router.post('/create', checkTokenMiddleware.checkTokenAdmin ,ProductController.createProduct)
router.delete('/:id' , checkTokenMiddleware.checkTokenAdmin, ProductController.deleteUserById)

router.put('/login/:id', checkTokenMiddleware.checkTokenAdmin, ProductController.updateLoginAdmin);

module.exports = router;
