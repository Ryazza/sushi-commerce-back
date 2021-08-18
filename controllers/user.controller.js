const UserService = require('../services/user.service')
const jwt = require('jsonwebtoken');
const checkTokenMiddleware = require('../controllers/jwt.controller');
//inscription
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
    } catch (e) {
        res.status(403)
        console.log(e)
        res.send({
            success: false,
            errors: e
        })
    }
}
// ajout d'une adress
exports.addAdress = async (req, res) => {
    try {

        let newUser = await UserService.addAddress(req.user.id, req.body)
        if (newUser.success === true) {
            res.status(201)
            res.send(newUser)
        } else {
            res.status(400)
            res.send(newUser)
        }
    } catch (e) {
        res.status(403)
        console.log(e)
        res.send({
            success: false,
            errors: e
        })
    }
}
//voir ses adress
exports.getMyAdress = async (req, res) => {
    try {

    } catch (e) {
        res.status(403)
        console.log(e)
        res.send({
            success: false,
            errors: e
        })
    }
}
//connection
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
//Supprimer mon compte
exports.deleteUser = async (req, res) => {
    try {
        let userServiceRes = await UserService.unsetUser(req.user.id);
        res.status(200);
        res.send(userServiceRes);

    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}
//Récupéré mes information
exports.getMe = async (req, res) => {
    try {
        let userServiceRes = await UserService.getMe(req.user.id);
        res.status(200);
        res.send(userServiceRes);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        });
    }
}
//Modifier mon mot de passe
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
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        });
    }
}
//Modification de l'email
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
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        });
    }
}
//Modification de la date de naissance
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
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        });
    }
}


exports.allUser = async (req, res) => {
    try {
        let allUser = await UserService.allUser();
        res.status(200);
        res.send(allUser);
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}
exports.deleteUserById = async (req, res) => {
    try {
        if(req.user.id !== req.params.id) {
            let userServiceRes = await UserService.deleteUserById(req.params.id);
            res.status(200);
            res.send(userServiceRes);
        } else {
            res.status(400);
            res.send({
                success: false,
                message: "Vous ne pouvez pas supprimez votre compte depuis ici !"
            });
        }
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}
//ADMIN Modifier le mail par id
exports.updateMailAdmin = async (req, res) => {
    try {
        if(req.user.id !== req.params.id) {
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
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        });
    }
}
// ADMIN modifier le role par id
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
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        });
    }
}
