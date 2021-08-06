const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const SECRET = 'RyaSuiteSecretKey1298456';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isDate(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}
//inscription
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
//ajout d'une adresse
exports.addAddress = async (id, objectAddress) => {
    let user = await User.findOne({_id: id})
    if (user) {
        let addressToAdd = {};

        if (body(objectAddress.no).isNumeric()) {
            addressToAdd.no = objectAddress.no;
        } else if(!body(objectAddress.no).isNumeric() && objectAddress.no) {
            return {
                success: false,
                error: "No not valid, number needed"
            }
        }

        if (objectAddress.address && body(objectAddress.address).isString()  && body(objectAddress.complement).isLength({ min: 2 , max: 255})) {
            addressToAdd.address = objectAddress.address;
        } else {
            return {
                success: false,
                error: "Address not valid min string: 2 max : 255"
            }
        }

        if (body(objectAddress.complement).isString() && body(objectAddress.complement).isLength({ min: 2 , max: 255})) {
            addressToAdd.complement = objectAddress.complement;
        } else if(objectAddress.complement  && !body(objectAddress.complement).isString() || objectAddress.complement && !body(objectAddress.complement).isLength({ min: 2 , max: 255})) {
            return {
                success: false,
                error: "Complement not valid, string needed nim : 2 max : 255"
            }
        }
        if (body(objectAddress.cp).isNumeric()) {
            addressToAdd.cp = objectAddress.cp;
        } else {
            return {
                success: false,
                error: "No not valid, number needed"
            }
        }

        if (body(objectAddress.city).isString() && body(objectAddress.city).isLength({ min: 2 , max: 255})) {
            addressToAdd.city = objectAddress.city;
        } else if(objectAddress.city  && !body(objectAddress.city).isString() || objectAddress.city && !body(objectAddress.city).isLength({ min: 2 , max: 255})) {
            return {
                success: false,
                error: "City not valid, string needed nim : 2 max : 255"
            }
        }

        if (body(objectAddress.phone).isNumeric()) {
            addressToAdd.phone = objectAddress.phone;
        } else if(objectAddress.phone  && !body(objectAddress.phone).isNumeric()) {
            return {
                success: false,
                error: "phone number not valid"
            }
        }

        user.address.push(addressToAdd);
        return {
            success: true,
            message: "Address added successfully"
        }
    }
    return {
        success: false,
        error: "User not found"
    }
}
//connexion
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
// Supprimer mon compte
exports.unsetUser = async (id) => {
    await User.deleteOne({_id: id});
    return {
        success: true
    };
}
//Récupérer mes information
exports.getMe = async (id) => {
    let user = await User.findOne({_id: id})
    return {
        success: true,
        user: user
    }
}
//Modifier mon mot de passse
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
// Modifier mon adress mail
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
//Modifier ma date de naissance
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
//ADMIN récupéré un la liste de tout les utilisateur inscrit
exports.allUser = async () => {
    let users = await User.find({})
    return {
        success: true,
        users: users
    }
}
//ADMIN Supprimer un utilisateur
exports.deleteUserById = async (id) => {
    await User.deleteOne({_id: id})
    return {
        success: true
    }
}
//ADMIN modification du role de l'utilisateur
exports.updateRole = async (id, role) => {

    await User.updateOne({_id: id}, {admin: role.admin, updateAt: new Date()});
    return {
        success: true,
        message: "Le rôle a été modifié"
    };
}
