const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

router.post('/', ProductController.addUser)
router.post('/login', ProductController.connectUser)

router.get('/', checkTokenMiddleware.checkToken, ProductController.getMe)

router.delete('/' , checkTokenMiddleware.checkToken, ProductController.deleteUser)

router.put('/login', checkTokenMiddleware.checkToken, ProductController.updateLogin);
router.put('/email', checkTokenMiddleware.checkToken, ProductController.updateMail);
router.put('/password', checkTokenMiddleware.checkToken, ProductController.updateUserPass);

//admin user routes

router.get('/all', checkTokenMiddleware.checkTokenAdmin ,ProductController.allUser)
router.delete('/:id' , checkTokenMiddleware.checkTokenAdmin, ProductController.deleteUserById)
router.put('/login/:id', checkTokenMiddleware.checkTokenAdmin, ProductController.updateLoginAdmin);
router.put('/email/:id', checkTokenMiddleware.checkTokenAdmin, ProductController.updateMailAdmin);
router.put('/admin/:id', checkTokenMiddleware.checkTokenAdmin, ProductController.updateRole);

module.exports = router;
