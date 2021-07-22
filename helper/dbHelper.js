const mongoose = require('mongoose');

module.exports.checkObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            success: false,
            message: id + " !"
        };
    } else {
        return true;
    }
}
