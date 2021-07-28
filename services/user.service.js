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
                error: "Le mot de passe doit faire au minimum 6 caractères !"
            }
        }
        form.password = await bcrypt.hash(form.password, 10);
        if (form.gender.length < 3) {
            return {
                success: false,
                error: "Genre invalide"
            }
        }
        if (form.firstName.length < 2 || form.firstName.length > 200) {
            return {
                success: false,
                error: "Le prénom doit faire entre 2 et 200 caractères !"
            }
        }
        if (form.lastName.length < 2 || form.lastName.length > 200) {
            return {
                success: false,
                error: "Le nom doit faire entre 2 et 200 caractères !"
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
//connexion
exports.logUser = async (form) => {
    const user = await User.findOne({email: form.email})
    if (!user) {
        return {
            success: false,
            error: "Vos identifiants sont incorect !"
        }
    } else {
        let valid = await bcrypt.compare(form.password, user.password)
        if (!valid) {
            return {
                success: false,
                error: "Vos identifiants sont incorect !"
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
            error: "Le mot de passe doit faire au minimum 6 caractères !"
        }
    }
    let user = await User.findOne({_id: id})
    let valid = await bcrypt.compare(change.password, user.password)
    if (!valid) {
        return {
            success: false,
            error: "L'ancien mot de pass ne correspond pas !",
        };
    }
    change.newPassword = await bcrypt.hash(change.newPassword, 10);
    await User.updateOne({_id: id}, {password: change.newPassword, updateAt: new Date()});
    return {
        success: true,
        message: "Le mot de passe a bien été changer"
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
            message: "Aucun changement n'a été effectuer",
            email: change.email
        }
    }
    await User.findOneAndUpdate({_id: id}, {email: change.email, updateAt: new Date()});
    return {
        success: true,
        message: "Votre email a bien été modifier",
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
            message: "Aucun changement n'a été effectuer",
            email: change.email
        }
    }
    await User.findOneAndUpdate({_id: id}, {birth: change.birth, updateAt: new Date()});
    return {
        success: true,
        message: "Votre date de naissance a bien été modifier",
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
        message: "Le role a été modifié"
    };
}
