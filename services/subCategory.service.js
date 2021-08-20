const SubCategory = require('../models/subCategoryModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const mongoose = require('mongoose');

/*------------------------- USER ---------------------------*/

exports.getAllSubCategory = async () => {

    try {
        let subCategory = await SubCategory.find().populate('category', "id name description");

        if (subCategory.length < 1) {
            return {
                success: false,
                error: "Il n'y a pas encore de catégorie"
            }
        } else {
            return {
                success: true,
                subCategory: subCategory
            }
        }

    } catch (e) {
        throw (e)
    }

}

exports.getOneSubCategory = async ({id}) => {
    try {
        let subCategory = await SubCategory.findById(id).populate("category", "name description");
        if (typeof subCategory !== "object" || !subCategory) {
            return {
                success: false,
                error: "Votre id est incorrect"
            }
        } else {
            return {
                success: true,
                subCategory: subCategory
            }
        }
    } catch (e) {
        throw e;
    }
}

exports.getOneSubCategoryAndProduct = async ({id}) => {
    try {
        let subCategory = await Product.find({subCategoryId: id})
            .populate({path: "subCategoryId", populate: {path: "category", model: 'category', select: "_id name"}, model: 'subCategory', select: "_id name"})
            .sort({name: 1}).select("-createdAt -__v -sale -views");
        if (typeof subCategory !== "object" || !subCategory || subCategory.length < 1) {
            return {
                success: false,
                error: "Cette catégorie n'existe pas ou n'a pas encore de produits"
            }
        } else {
            return {
                success: true,
                products: subCategory
            }
        }
    } catch (e) {
        throw e;
    }
}

/*-------------------------- ADMIN ---------------------------*/

exports.getOneSubCategoryAndProductAdmin = async ({id}) => {
    try {
        let subCategory = await Product.find({subCategoryId: id})
            .populate({path: "subCategoryId", populate: {path: "category", model: 'category', select: "_id name"}, model: 'subCategory', select: "_id name"})
            .sort({name: 1});
        if (typeof subCategory !== "object" || !subCategory || subCategory.length < 1) {
            return {
                success: false,
                error: "Cette catégorie n'existe pas ou n'a pas encore de produits"
            }
        } else {
            return {
                success: true,
                products: subCategory
            }
        }
    } catch (e) {
        throw e;
    }
}

exports.createSubCategory = async (form) => {
    try {
        let verify = await verifyEntry(form, true);
        if (verify.success === true) {
            form.name = form.name.toLowerCase();
            form.name = form.name.capitalizeFirstLetter();
            let testCategorie = await SubCategory.find({name: form.name});
            if (testCategorie.length > 0) {
                return {
                    success: false,
                    message: "La sous-catégorie existe déjà",
                    categoryId: testCategorie._id

                }
            } else {
                const subCategory = new SubCategory({createdAt: new Date(), updateAt: new Date()});
                Object.assign(subCategory, form);
                let response = await subCategory.save();
                await Category.findOneAndUpdate({_id: form.category}, {$push: {subCategory: response.id}});

                return {
                    success: true,
                    subCategoryId: subCategory._id

                };
            }
        } else {
            return {
                success: verify.success,
                message: verify.message,
                errors: verify.error,
                subCategoryId: verify.subCategoryId
            }
        }
    } catch (e) {
        throw e;
    }
}

exports.updateSubCategory = async (id, change) => {
    try {
        let verify = await verifyEntry(change, true, true);
        if (verify.success === true) {

            change.name = change.name.toLowerCase();
            change.name = change.name.capitalizeFirstLetter();

            await SubCategory.findOneAndUpdate(
                {_id: id},
                change,
                {new: true}
            )
            if (verify.changeCategory) {
                await Category.findOneAndUpdate(
                    {_id: verify.newIdCategory},
                    {subCategory: mongoose.Types.ObjectId(id)},
                    {new: true}
                )
                await Category.findOneAndUpdate(
                    {_id: verify.oldIdCategory},
                    {
                        $pull: {
                            subCategory: mongoose.Types.ObjectId(id)
                        }
                    },
                    {new: true}
                )

            }
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

exports.deleteSubCategoryById = async (id) => {
    try {
        let testSubCategorie = await SubCategory.findById(id);
        if (!testSubCategorie) {
            return {
                success: false,
            }
        }
        await SubCategory.deleteOne({_id: id})
        return {
            success: true
        }
    } catch (e) {
        throw e;
    }
}

/*----------- VERIFY --------------*/
async function verifyEntry(subCategory, checkValue = null, update = false) {

    let oldIdCategory = "";
    let newIdCategory = ""; // si update recuperation du nouveau id pour comparaison a l ancien

    if (checkValue !== null) {
        if (typeof subCategory.category !== "undefined") {
            let idExist = await Category.findById(subCategory.category);
            newIdCategory = idExist._id; // recuperation du futur id pour comparaison
            if (!idExist) {
                return {
                    success: false,
                    message: "Votre catégorie n'existe pas!",
                }
            }

        } else {
            return {
                success: false,
                message: "Le champ 'categorie' doit être rempli!"
            }
        }

        if (typeof subCategory.name === "undefined") {
            return {
                success: false,
                message: "Vous devez définir une sous-catégorie",
                error: "name"
            };

        } else if (typeof subCategory.name !== "string") {
            return {
                success: false,
                message: "Vous devez rentrer des caractères alphabétiques pour votre sous-catégorie",
                error: "name"
            };
        } else if (subCategory.name.length < 3) {
            return {
                success: false,
                message: "3 caractères minimum pour votre sous-catégorie",
                error: "name"
            };
        }

        if (update) {
            let currentSubCat = await SubCategory.findById(id);
            oldIdCategory = currentSubCat.category;
        }

        subCategory.name = subCategory.name.toLowerCase();
        subCategory.name = subCategory.name.capitalizeFirstLetter();

        let nameExist = await SubCategory.find({name: subCategory.name});

        if (nameExist.length > 0 && update === false) {
            return {
                success: false,
                message: "Votre nom de sous catégorie existe déjà !",
                subCategoryId: nameExist[0]._id

            }
        } else if (update === true && nameExist.length > 0) {
            let updatedSubCategory = await SubCategory.findById(id);

            if (updatedSubCategory.name !== subCategory.name) {
                return {
                    success: false,
                    message: "Votre nom de sous-catégorie existe déjà !",
                    categoryId: updatedSubCategory._id

                }
            }
        }

        if (typeof subCategory.description === "undefined") {
            return {
                success: false,
                message: "Vous devez définir une description"
            };

        } else if (typeof subCategory.description !== "string") {
            return {
                success: false,
                message: "Vous devez rentrer des caractères alphabétiques pour votre description",
                error: "name"
            };
        } else if (subCategory.description.length < 5 || subCategory.description.length > 255) {
            return {
                success: false,
                message: "5 à 255 caractères pour votre description",
                error: "name"
            };
        }
    }
    if (update === true) {
        if (JSON.stringify(newIdCategory) !== JSON.stringify(oldIdCategory)) {
            return {
                success: true,
                changeCategory: true,
                newIdCategory: newIdCategory,
                oldIdCategory: oldIdCategory
            }
        } else {
            return {
                success: true,
                changeCategory: false
            };
        }

    } else {
        return {success: true}
    }
}

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
