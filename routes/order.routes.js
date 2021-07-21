const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

router.post('/', orderController.addOrder)

router.get('/', orderController.getAllOrder)
//
// router.delete('/' , checkTokenMiddleware.checkToken, orderController.deleteOrder)
//
// router.put('/login', checkTokenMiddleware.checkToken, orderController.updateOrder);

module.exports = router;
