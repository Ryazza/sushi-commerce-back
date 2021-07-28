const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

//routes for user and all
router.get('/', ProductController.getProducts)
router.get('/search/:keyword', ProductController.searchProductByName)
router.get('/one/:id', ProductController.searchOneProduct)
router.get('/sort/:type' ,ProductController.sortProducts)

// router.get('/{id}', ProductController.getProduct)

//admin user routes
router.post('/create', checkTokenMiddleware.checkTokenAdmin, ProductController.createProduct)
router.put('/update/:id', checkTokenMiddleware.checkTokenAdmin,ProductController.updateProduct)
router.get('/verifyStock', checkTokenMiddleware.checkTokenAdmin, ProductController.showStock)//le form envoyé doit contenir également le contenu non modifié
router.put('/updateStock', checkTokenMiddleware.checkTokenAdmin, ProductController.updateStock)
router.put('/deduceStock/:id', checkTokenMiddleware.checkTokenAdmin, ProductController.deduceStock)
router.put('/addStock/:id', checkTokenMiddleware.checkTokenAdmin, ProductController.addStock)
// router.delete('/:id' , checkTokenMiddleware.checkTokenAdmin, ProductController.deleteUserById)

// router.put('/login/:id', checkTokenMiddleware.checkTokenAdmin, ProductController.updateLoginAdmin);

module.exports = router;
