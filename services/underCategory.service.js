const UnderCategory = require('../models/underCategoryModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const { checkObjectId } = require('../helper/dbHelper');

/*------------------------- USER ---------------------------*/

exports.getAllUnderCategory = async () => {

    try {
        let underCategory = await UnderCategory.find().populate('category', "id name description");

        if(underCategory.length < 1) {
            return {
                success: false,
                error: "Il n'y a pas encore de catégorie"
            }
        } else {
            return {
                success: true,
                subCategory: underCategory
            }
        }

    } catch (e) {
        throw (e)
    }

}

exports.getOneUnderCategory = async ({ id }) => {
    try {
        let underCategory = await UnderCategory.findById(id).populate("category", "name description");
        if(typeof underCategory !== "object" || !underCategory) {
            return {
                success: false,
                error: "Votre id est incorrect"
            }
        } else {
            return {
                success: true,
                subCategory: underCategory
            }
        }
    } catch (e) {
        throw e;
    }
}

exports.getOneSubCategoryAndProduct = async ({ id }) => {
    try {
        let verifId = checkObjectId(id);

        if(verifId.success === false) {
            return {
                success: false,
                message: "Votre sous-catégorie n'existe pas!"
            }
        }
        let underCategory = await Product.find({subCategoryId: id}).sort({name: 1});
        if(typeof underCategory !== "object" || !underCategory || underCategory.length < 1) {
            return {
                success: false,
                error: "Cette catégorie n'existe pas ou n'a pas encore de produits"
            }
        } else {
            return {
                success: true,
                products: underCategory
            }
        }
    } catch (e) {
        throw e;
    }
}

/*-------------------------- ADMIN ---------------------------*/

exports.createUnderCategory = async (form) => {
    try {
        let verify = await verifyEntry(form, true);

        if(verify.success === true) {
            form.name = form.name.toLowerCase();
            form.name = form.name.capitalizeFirstLetter();
            let testCategorie = await UnderCategory.find({name: form.name});
            if(testCategorie.length > 0) {
                return {
                    success: false,
                    message: "La sous-catégorie existe déjà"
                }
            } else {
                const underCategory = new UnderCategory({createdAt: new Date(), updateAt: new Date()});
                Object.assign(underCategory, form);
                let response = await underCategory.save();
                await Category.findOneAndUpdate({ _id: form.category}, { $push: { subCategory: response.id }} );

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

exports.updateUnderCategory = async (id, change) => {

    try {
        let verify = await verifyEntry(change, true, id, true);
        if(verify.success === true) {

            change.name = change.name.toLowerCase();
            change.name = change.name.capitalizeFirstLetter();

            await UnderCategory.findOneAndUpdate(
                { _id: id },
                change,
                { new: true }
            )
            return {
                success: true,
                message: "Votre sous-catégorie a bien été modifiée",
                subCategory: change,
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

exports.deleteUnderCategoryById = async (id) => {
    try {
        let verifId = checkObjectId(id);

        if(verifId.success === true) {
            let idExist = await UnderCategory.findById(id);
            if(!idExist) {
                return {
                    success: false,
                }
            }
        } else {
            return {
                success: false,
            }
        }
        let testUnderCategorie = await UnderCategory.findById(id);
        if(!testUnderCategorie) {
            return {
                success: false,
            }
        }
        await UnderCategory.deleteOne({_id: id})
        return {
            success: true
        }
    } catch (e) {
        throw e;
    }
}

/*----------- function for add update underCategory -----------------*/

/*----------- VERIFY --------------*/
async function verifyEntry(underCategory, checkValue = null, id=null, update= false) {

    if(id !== null) {
        let verifId = checkObjectId(id);
        console.log(id)
        if(verifId.success === true) {
            let idExist = await UnderCategory.findById(id);
            if(!idExist) {
                return {
                    success: false,
                    message: "Votre sous catégorie n'existe pas!"
                }
            }
        } else {
            return {
                success: false,
                message: "Votre sous catégorie n'existe pas!"
            }
        }
    }

    if (checkValue !== null) {

        if(typeof underCategory.category !== "undefined") {
            let verifId = checkObjectId(underCategory.category);

            if(verifId.success === true) {
                console.log(underCategory.category)
                let idExist = await Category.findById(underCategory.category);

                if(!idExist) {
                    console.log(idExist)
                    console.log("rentré sous 1")
                    return {
                        success: false,
                        message: "Votre catégorie n'existe pas!",
                    }
                }
            } else {
                console.log("rentré encore sous 1")
                return {
                    success: false,
                    message: "Votre catégorie n'existe pas!"
                }
            }
        } else {
            return {
                success: false,
                message: "Le champ 'category' doit être remplis!"
            }
        }

        if(typeof underCategory.name === "undefined") {
            return {
                success: false,
                message: "Vous devez définir une sous-catégorie",
                error: "name"
            };

        } else if (typeof underCategory.name !== "string") {
            return {
                success: false,
                message: "Vous devez rentrer des caractères alphabétiques pour votre sous-catégorie",
                error: "name"
            };
        } else if (underCategory.name.length < 3) {
            return {
                success: false,
                message: "3 caractères minimum pour votre sous-catégorie",
                error: "name"
            };
        }

        underCategory.name = underCategory.name.toLowerCase();
        underCategory.name = underCategory.name.capitalizeFirstLetter();

        let nameExist = await UnderCategory.find({ name: underCategory.name});

        if(nameExist.length > 0 && update === false ) {
            return {
                success: false,
                message: "Votre nom de sous catégorie existe déjà !",
            }
        } else if(update === true && nameExist.length > 0) {
            let updatedSubCategory = await UnderCategory.findById(id);

            if(updatedSubCategory.name !== underCategory.name ) {
                return {
                    success: false,
                    message: "Votre nom de sous-catégorie existe déjà !",
                }
            }
        }

        if(typeof underCategory.description === "undefined") {
            return {
                success: false,
                message: "Vous devez définir une description"
            };

        } else if (typeof underCategory.description !== "string") {
            return {
                success: false,
                message: "Vous devez rentrer des caractères alphabétiques pour votre description",
                error: "name"
            };
        } else if (underCategory.description.length < 5 || underCategory.description.length > 100) {
            return {
                success: false,
                message: "5 à 100 caractères pour votre description",
                error: "name"
            };
        }
    }
    return { success: true };
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
