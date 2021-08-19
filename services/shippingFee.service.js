const ShippingFee = require('../models/shippingFeeModel.js');


exports.addShippingFee = async (form) => {

    try {
        const shippingFee = new ShippingFee({});
        Object.assign(shippingFee, form);
        await shippingFee.save();
        return {
            success: true
        };
    } catch (e) {
        throw e;
    }
}
exports.getPrice = async (data) => {
    try {
        let fee= [];
         fee = await ShippingFee.findOne({
            country: data.location,
            type: data.type
        })
        let price;

        fee.weight.forEach(el => {
            if (el.name===data.weight){
                price = el.value
            }
        })
        let response = {
            delay : fee.delay,
            price: price,
            notaBene: "le délai est en jour ouvrés et le prix est en € Hors taxes"
        }
        return {
            success: true,
            response: response
        }
    } catch (e) {
        console.log(e)
        throw e;
    }
}
exports.getAll = async () => {
    try {
        let response = await ShippingFee.find({})

        return {
            success: true,
            response: response
        }
    } catch (e) {
        console.log(e)
        throw e;
    }
}