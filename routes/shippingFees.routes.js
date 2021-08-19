const express = require('express');
const router = express.Router();
const ShippingFeeController = require('../controllers/shippingFee.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

// router.get('/{id}', ColissushiController.getProduct)

router.post('/',  ShippingFeeController.createFee)

router.get('/all',  ShippingFeeController.getAll)

router.get('/:weight&:location&:type', ShippingFeeController.getPrice)
module.exports = router;
