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
