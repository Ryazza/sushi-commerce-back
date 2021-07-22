const mongoose = require('mongoose');

module.exports.checkObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return false;
    } else {
        return true;
    }
}
