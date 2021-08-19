const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

router.post('/', checkTokenMiddleware.checkToken, orderController.addOrder)
router.post('/calculate', checkTokenMiddleware.checkToken, orderController.calculateOrder);

router.get('/orderedUser', checkTokenMiddleware.checkToken, orderController.getOrderByUser)

router.get('/:id', checkTokenMiddleware.checkToken, orderController.getOneOrder)


router.put('/:id', checkTokenMiddleware.checkToken, orderController.updateOrder)

router.delete('/:id', checkTokenMiddleware.checkToken, orderController.deleteOrder)

/*-------------- ADMIN -----------------*/

router.get('/', checkTokenMiddleware.checkTokenAdmin, orderController.getAllOrder)
router.get('/status/:status/:order', checkTokenMiddleware.checkTokenAdmin, orderController.getAllOrderByStatus)
router.put('/status/newStatus/:id', checkTokenMiddleware.checkTokenAdmin, orderController.updateStatus)
router.get('/admin/order/:id', checkTokenMiddleware.checkTokenAdmin, orderController.getOrderByIdAdmin)

module.exports = router;
