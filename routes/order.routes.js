const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

router.post('/', checkTokenMiddleware.checkToken, orderController.addOrder)

router.get('/', checkTokenMiddleware.checkToken, orderController.getAllOrder)

router.get('/:id', checkTokenMiddleware.checkToken, orderController.getOneOrder)

router.get('/byUser/:id', checkTokenMiddleware.checkToken, orderController.getOrderByUser)

router.put('/:id', checkTokenMiddleware.checkToken, orderController.updateOrder)

router.delete('/:id', checkTokenMiddleware.checkToken, orderController.deleteOrder)

/*-------------- ADMIN -----------------*/

router.get('/status/:status/:order', orderController.getAllOrderByStatus)

// reste middleware checkTokenMiddleware.checkToken

module.exports = router;
