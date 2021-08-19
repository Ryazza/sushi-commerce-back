const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const SECRET = 'RyaSuiteSecretKey1298456';

// ------------------- User Service -------------------
exports.addUser = async (form) => {
    try {
        if (!validateEmail(form.email)) {
            return {
                success: false,
                error: "Email invalide !"
            }
        }
        if (form.password.length < 6) {
            return {
                success: false,
                error: "Le mot de passe doit contenir au minimum 6 caractères !"
            }
        }
        form.password = await bcrypt.hash(form.password, 10);
        if (form.gender !== "male" && form.gender !== "female" && form.gender !== "other") {
            return {
                success: false,
                error: "Genre invalide"
            }
        }
        if (form.firstName.length < 2 || form.firstName.length > 200) {
            return {
                success: false,
                error: "Le prénom doit contenir entre 2 et 200 caractères !"
            }
        }
        if (form.lastName.length < 2 || form.lastName.length > 200) {
            return {
                success: false,
                error: "Le nom doit contenir entre 2 et 200 caractères !"
            }
        }
        if (!isDate(form.birth)) {
            return {
                success: false,
                error: "Date invalide !"
            }
        }
        if (form.admin) {
            form.admin = false;
        }
        if (form.adress) {
            form.adress = []
        }
        if (form.payment) {
            form.payment = []
        }
        const user = new User({createdAt: new Date(), updateAt: new Date(), admin: false, adress: [], payment: []});
        Object.assign(user, form);
        await user.save();
        return {
            success: true
        };
    } catch (e) {
        throw e
    }
}
exports.logUser = async (form) => {
    const user = await User.findOne({email: form.email})
    if (!user) {
        return {
            success: false,
            error: "Vos identifiants sont incorects !"
        }
    } else {
        let valid = await bcrypt.compare(form.password, user.password)
        if (!valid) {
            return {
                success: false,
                error: "Vos identifiants sont incorects !"
            }
        } else {
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                admin: user.admin
            }, SECRET, {expiresIn: '24 hours'})
            return {
                success: true,
                token: token,
                admin: user.admin
            };
        }
    }
}
exports.unsetUser = async (id) => {
    try {
        await User.deleteOne({_id: id});
        return {
            success: true
        };
    } catch (error) {
        throw error
    }
}
exports.getMe = async (id) => {
    try {
        return {
            success: true,
            user: await User.findOne({_id: id})
        }
    } catch (error) {
        throw error
    }
}
exports.updateUserPass = async (id, change) => {
    if (change.newPassword.length < 6) {
        return {
            success: false,
            error: "Le mot de passe doit contenir au minimum 6 caractères !"
        }
    }
    let user = await User.findOne({_id: id})
    let valid = await bcrypt.compare(change.password, user.password)
    if (!valid) {
        return {
            success: false,
            error: "L'ancien mot de passe ne correspond pas !",
        };
    }
    change.newPassword = await bcrypt.hash(change.newPassword, 10);
    await User.updateOne({_id: id}, {password: change.newPassword, updateAt: new Date()});
    return {
        success: true,
        message: "Le mot de passe a bien été changé"
    };
}
exports.updateMail = async (id, change) => {
    if (!validateEmail(change.email)) {
        return {
            success: false,
            error: "Email invalide !"
        }
    }
    const user = await User.findOne({_id: id})
    if (user.email === change.email) {
        return {
            success: true,
            message: "Aucun changement n'a été effectué",
            email: change.email
        }
    }
    await User.findOneAndUpdate({_id: id}, {email: change.email, updateAt: new Date()});
    return {
        success: true,
        message: "Votre email a bien été modifié",
        email: change.email
    };
}
exports.updateBirth = async (id, change) => {
    if (!isDate(change.birth)) {
        return {
            success: false,
            error: "Date invalide !"
        }
    }
    const user = await User.findOne({_id: id})
    let newDate = new Date(change.birth)
    if (user.birth.getTime() === newDate.getTime()) {
        return {
            success: true,
            message: "Aucun changement n'a été effectué",
            email: change.email
        }
    }
    await User.findOneAndUpdate({_id: id}, {birth: change.birth, updateAt: new Date()});
    return {
        success: true,
        message: "Votre date de naissance a bien été modifié",
        birth: new Date(change.birth)
    };
}
// ------------------- Address Service -------------------
exports.addAddress = async (id, objectAddress) => {
    let user = await User.findOne({_id: id})
    if (user) {
        switch (false) {
            case verifyNumberValidity(objectAddress.no).success:
                return verifyNumberValidity(objectAddress.no);
            case verifyStringValidity(objectAddress.address).success:
                return verifyStringValidity(objectAddress.address)
            case verifyNumberValidity(objectAddress.cp).success:
                return verifyNumberValidity(objectAddress.cp);
            case verifyStringValidity(objectAddress.city).success:
                return verifyStringValidity(objectAddress.city);
            case verifyNumberValidity(objectAddress.phone).success:
                return verifyNumberValidity(objectAddress.phone);
            default:
                user.address.push(objectAddress);
                user.save();
                return {
                    success: true,
                    message: "Address added successfully"
                }
        }
    }
    return {
        success: false,
        error: "User not found"
    }
}
exports.getMyAdress = async (idUser) => {
    try {
        return {
            success: true,
            address: await User.findOne({_id: idUser}, 'address')
        };
    } catch (e) {
        throw  e;
    }
}
exports.deleteAddress = async (idUser, idAddress) => {
    try {
        await User.updateOne({_id: idUser}, {"$pull": {"address": {"_id": idAddress}}}, {safe: true, multi: true});
        return {success: true};
    } catch (error) {
        throw error;
    }
}
exports.updateAddress = async (idUser, idAddress, body) => {
    try {
        let updateValue = {};
        if (verifyNumberValidity(body.no).success === true) updateValue = {...updateValue, 'address.$.no': body.no};
        if (verifyStringValidity(body.address).success === true) updateValue = {...updateValue, 'address.$.address': body.address};
        if (verifyNumberValidity(body.cp).success === true) updateValue = {...updateValue, 'address.$.cp,': body.cp};
        if (verifyStringValidity(body.city).success === true) updateValue = {...updateValue, 'address.$.city': body.city};
        if (verifyNumberValidity(body.phone).success === true) updateValue = {...updateValue, 'address.$.phone': body.phone};
        if (verifyNumberValidity(body.complement).success === true) updateValue = {...updateValue, 'address.$.complement': body.complement};
        await User.updateOne({_id: idUser, address: {$elemMatch: {_id: idAddress}}},
            {$set: updateValue},
            {'new': true, 'safe': true, 'upsert': true});
        return {success: true};
    } catch (error) {
        throw error
    }
}
// --------------------- ADMIN ---------------------
exports.allUser = async () => {
    try {
        return {
            success: true,
            users: await User.find({})
        }
    } catch (error) {
        throw error
    }
}
exports.userById = async (id) => {
    try {
        return {
            success: true,
            users: await User.findById(id)
        }
    } catch (error) {
        throw error
    }
}
exports.deleteUserById = async (id) => {
    await User.deleteOne({_id: id})
    return {success: true}
}
exports.updateRole = async (id, role) => {

    await User.updateOne({_id: id}, {admin: role.admin, updateAt: new Date()});
    return {
        success: true,
        message: "Le rôle a été modifié"
    };
}
// --------------------- Utils ---------------------
verifyNumberValidity = (nbr) => {
    let RegIsNumeric = /\d+$/g;
    if (nbr && RegIsNumeric.test(nbr)) {
        return {success: true}
    } else {
        return {
            success: false,
            error: "No not valid, number needed"
        }
    }
}

verifyStringValidity = (str) => {
    if (str && typeof str === "string" && str.length > 2 && str.length < 255) {
        return {success: true}
    } else {
        return {
            success: false,
            error: "Not valid string: 2 max : 255"
        }
    }
}

validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

isDate = (date) => {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}