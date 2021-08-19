const express = require('express');
const router = express.Router();
const ShippingFeeController = require('../controllers/shippingFee.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

// router.get('/{id}', ColissushiController.getProduct)

router.post('/',  ShippingFeeController.createFee)

module.exports = router;
