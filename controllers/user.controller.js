const UserService = require('../services/user.service')

exports.addUser = async (req, res) => {
    try {
        let newUser = await UserService.addUser(req.body)
        if (newUser.success === true) {
            res.status(201)
            res.send(newUser)
        } else {
            res.status(400)
            res.send(newUser)
        }
    } catch (errors) {
        res.status(403)
        res.send({success: false, errors})
    }
}
exports.addAdress = async (req, res) => {
    try {
        let newAddress = await UserService.addAddress(req.user.id, req.body)
        if (newAddress.success === true) {
            res.status(201)
            res.send(newAddress)
        } else {
            res.status(400)
            res.send(newAddress)
        }
    } catch (errors) {
        res.status(403)
        res.send({success: false, errors})
    }
}
exports.getMyAdress = async (req, res) => {
    try {
        res.status(200);
        res.send(
            await UserService.getMyAdress(req.user.id)
        )
    } catch (errors) {
        res.status(400)
        res.send({success: false, errors})
    }
}
exports.updateAddress = async (req, res) => {
    try {
        let newAddress = await UserService.updateAddress(req.user.id, req.params.id, req.body)
        if (newAddress.success === true) {
            res.status(201)
            res.send(newAddress)
        } else {
            res.status(400)
            res.send(newAddress)
        }

    } catch (errors) {
        res.status(400)
        res.send({success: false, errors})
    }
}
exports.deleteAdress = async (req, res) => {
    try {
        res.status(200);
        res.send(
            await UserService.deleteAddress(req.user.id, req.params.id)
        )
    } catch (errors) {
        res.status(400)
        res.send({success: false, errors})
    }
}
exports.connectUser = async (req, res) => {
    try {
        let logUser = await UserService.logUser(req.body)
        if (logUser.success === true) {
            res.status(201)
            res.send(logUser)
        } else {
            res.status(400)
            res.send(logUser)
        }
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}
exports.deleteUser = async (req, res) => {
    try {
        res.status(200);
        res.send(
            await UserService.unsetUser(req.user.id)
        );
    } catch (errors) {
        res.status(400)
        res.send({success: false, errors})
    }
}
exports.getMe = async (req, res) => {
    try {
        res.status(200);
        res.send(
            await UserService.getMe(req.user.id)
        );
    } catch (errors) {
        res.status(400);
        res.send({success: false, errors});
    }
}
exports.updateUserPass = async (req, res) => {
    try {
        let userServiceRes = await UserService.updateUserPass(req.user.id, req.body);
        if (userServiceRes.success) {
            res.status(200);
            res.send(userServiceRes);
        } else {
            res.status(400);
            res.send(userServiceRes);
        }
    } catch (errors) {
        res.status(400);
        res.send({success: false, errors});
    }
}
exports.updateMail = async (req, res) => {
    try {
        let userServiceRes = await UserService.updateMail(req.user.id, req.body);
        if (userServiceRes.success) {
            res.status(200);
            res.send(userServiceRes);
        } else {
            res.status(400);
            res.send(userServiceRes);
        }
    } catch (errors) {
        res.status(400);
        res.send({success: false, errors});
    }
}
exports.updateBirth = async (req, res) => {
    try {
        let userServiceRes = await UserService.updateBirth(req.user.id, req.body);
        if (userServiceRes.success) {
            res.status(200);
            res.send(userServiceRes);
        } else {
            res.status(400);
            res.send(userServiceRes);
        }
    } catch (error) {
        res.status(400);
        res.send({success: false, error});
    }
}
exports.allUser = async (req, res) => {
    try {
        res.status(200);
        res.send(
            await UserService.allUser()
        );
    } catch (errors) {
        res.status(400)
        res.send({success: false, errors})
    }
}
exports.userById = async (req, res) => {
    try {
        res.status(200);
        res.send(
            await UserService.userById(req.params.id)
        );
    } catch (error) {
        res.status(400)
        res.send({success: false, error})
    }
}
exports.deleteUserById = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            res.status(200);
            res.send(
                await UserService.deleteUserById(req.params.id)
            );
        } else {
            res.status(400);
            res.send({
                success: false,
                message: "Vous ne pouvez pas supprimez votre compte depuis ici !"
            });
        }
    } catch (errors) {
        res.status(400);
        res.send({success: false, errors});
    }
}
exports.updateMailAdmin = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            let userServiceRes = await UserService.updateMail(req.params.id, req.body);
            if (userServiceRes.success) {
                res.status(200);
                res.send(userServiceRes);
            } else {
                res.status(400);
                res.send(userServiceRes);
            }
        } else {
            res.status(400);
            res.send({
                success: false,
                message: "Vous ne pouvez pas modifier votre email d'ici !"
            });
        }
    } catch (errors) {
        res.status(400);
        res.send({success: false, errors});
    }
}
exports.updateRole = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            let userServiceRes = await UserService.updateRole(req.params.id, req.body);
            if (userServiceRes.success) {
                res.status(200);
                res.send(userServiceRes);
            } else {
                res.status(400);
                res.send(userServiceRes);
            }
        } else {
            res.status(400);
            res.send({
                success: false,
                message: "Vous ne pouvez pas modifier votre rôle !"
            });
        }
    } catch (errors) {
        res.status(400);
        res.send({success: false, errors});
    }
}