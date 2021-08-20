const ShippingFeeService = require('../services/shippingFee.service')

exports.createFee = async (req, res) => {
    try {
        let newShippingFee = await ShippingFeeService.addShippingFee(req.body)
        if (newShippingFee.success === true) {
            res.status(201)
            res.send(newShippingFee)
        } else {
            res.status(400)
            res.send(newShippingFee)
        }
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }

}
exports.getPrice = async (req, res) => {
    try {
        let response = await ShippingFeeService.getPrice(req.params)
        if (response.success === true) {
            res.status(201)
            res.send(response)
        } else {
            res.status(400)
            res.send(response)
        }

    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}
exports.getAll = async (req, res) => {
    try {
        let response = await ShippingFeeService.getAll()
        if (response.success === true) {
            res.status(201)
            res.send(response)
        } else {
            res.status(400)
            res.send(response)
        }

    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}