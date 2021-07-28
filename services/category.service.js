const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const { checkObjectId } = require('../helper/dbHelper');
const jwt = require('jsonwebtoken');

/*------------------------- USER ---------------------------*/

exports.getAllCategory = async () => {

    try {
        let category = await Category.find({})

        if(category.length < 1) {
            return {
                success: false,
                error: "Il n'y a pas encore de catégorie"
            }
        } else {
            return {
                success: true,
                category: category
            }
        }

    } catch (e) {
        throw (e)
    }

}

exports.getOneCategory = async ({ id }) => {
    try {
        let category = await Category.findById(id)
        if(typeof category !== "object" || !category) {
            return {
                success: false,
                error: "Votre id est incorrect"
            }
        } else {
            return {
                success: true,
                category: category
            }
        }
    } catch (e) {
        throw e;
    }
}



/*-------------------------- ADMIN ---------------------------*/

exports.createCategory = async (form) => {
    try {
        let verify = await verifyEntry(form, true);

        if(verify.success === true) {

            form.name = form.name.toLowerCase();
            form.name = form.name.capitalizeFirstLetter();
            let testCategorie = await Category.find({name: form.name});
            if(testCategorie.length > 0) {
                return {
                    success: false,
                    message: "La catégorie existe déjà"
                }
            } else {
                const category = new Category({createdAt: new Date(), updateAt: new Date()});
                Object.assign(category, form);
                await category.save();
                return {
                    success: true
                };
            }
        } else {
            return {
                success: verify.success,
                message: verify.message,
                errors: verify.error
            }
        }
    } catch (e) {
        throw e;
    }
}

exports.updateCategory = async (id, change) => {

    try {
        let category = await Category.findById(id);

        if (!category) {
            return {
                success: false,
                message: "Numero de catégorie incorrect",
            }
        }

        let verify = await verifyEntry(change, true, id);

        if(verify.success === true) {
            change.name = change.name.toLowerCase();
            change.name = change.name.capitalizeFirstLetter();

            await Category.findOneAndUpdate(
                { _id: id },
                change,
                { new: true }
            )
            return {
                success: true,
                message: "Votre catégorie a bien été modifié",
                category: change,
            };
        } else {
            return {
                success: verify.success,
                message: verify.message,
                error: verify.errors,
            }
        }
    } catch (e) {
        throw e;
    }
}

/*----------- function for add update category -----------------*/

/*----------- VERIFY --------------*/
async function verifyEntry(category, checkValue = null, id=null) {

    if(id !== null) {
        let verifId = checkObjectId(id);

        if(verifId.success === false) {
            let idExist = await Category.findById(id);
            if(!idExist) {
                return {
                    success: false,
                    message: "Votre categorie n'existe pas!"
                }
            }
        }
    }

    if (checkValue !== null) {
        if(typeof category.name === "undefined") {
            return {
                success: false,
                message: "Vous devez definir une catégorie",
                error: "name"
            };

        } else if (typeof category.name !== "string") {
            return {
                success: false,
                message: "Vous devez rentrez des caractères alphabétiques pour votre catégorie",
                error: "name"
            };
        } else if (category.name.length < 3) {
            return {
                success: false,
                message: "3 caractères minimum pour votre catégorie",
                error: "name"
            };
        }
    }
    return { success: true };
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
