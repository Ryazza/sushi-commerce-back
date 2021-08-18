const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

// router.get('/{id}', ProductController.getProduct)

//admin user routes
router.post('/create', checkTokenMiddleware.checkTokenAdmin, ProductController.createProduct)

router.put('/update/:id', checkTokenMiddleware.checkTokenAdmin,ProductController.updateProduct)
router.put('/update', checkTokenMiddleware.checkTokenAdmin,ProductController.updateProducts)
router.put('/update_available', checkTokenMiddleware.checkTokenAdmin, ProductController.updateAvailable)
router.put('/update_event/:event', checkTokenMiddleware.checkTokenAdmin, ProductController.updateEvent)
router.put('/updateStock', checkTokenMiddleware.checkTokenAdmin, ProductController.updateStock)
router.put('/deduceStock/:id', checkTokenMiddleware.checkTokenAdmin, ProductController.deduceStock)
router.put('/addStock/:id', checkTokenMiddleware.checkTokenAdmin, ProductController.addStock)

router.get('/verifyStock', checkTokenMiddleware.checkTokenAdmin, ProductController.showStock)

router.delete('/:id' , checkTokenMiddleware.checkTokenAdmin, ProductController.deleteProduct)
router.delete('/' , checkTokenMiddleware.checkTokenAdmin, ProductController.deleteProducts)

//routes for user and all
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getOneProduct)
router.get('/search/:keyword', ProductController.searchProductByName)
router.get('/one/:id', ProductController.searchOneProduct)
router.get('/sort/:type' ,ProductController.sortProducts)
router.get('/best_sales/:type' ,ProductController.findBestSales)

// router.delete('/:id' , checkTokenMiddleware.checkTokenAdmin, ProductController.deleteUserById)

// router.put('/login/:id', checkTokenMiddleware.checkTokenAdmin, ProductController.updateLoginAdmin);

module.exports = router;
