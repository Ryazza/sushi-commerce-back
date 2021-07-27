const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

//routes for user and all
router.get('/', ProductController.getProducts)
router.get('/search/:keyword', ProductController.searchProductByName)
router.get('/one/:id', ProductController.searchOneProduct)
router.get('/most_viewed' ,ProductController.mostViewedProducts)

// router.get('/{id}', ProductController.getProduct)

//admin user routes
router.post('/create' ,ProductController.createProduct)
router.put('/update/:id' ,ProductController.updateProduct)
router.get('/verifyStock' ,ProductController.showStock)//le form envoyé doit contenir également le contenu non modifié
// router.delete('/:id' , checkTokenMiddleware.checkTokenAdmin, ProductController.deleteUserById)

// router.put('/login/:id', checkTokenMiddleware.checkTokenAdmin, ProductController.updateLoginAdmin);

module.exports = router;
