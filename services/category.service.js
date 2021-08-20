const Category = require('../models/categoryModel');

/*------------------------- USER ---------------------------*/

exports.getAllCategory = async () => {

    try {

        let category = await Category.find().populate("subCategory", "id name description img", null, {sort: {name: 1}}).sort({name: 1});

        if (category.length < 1) {
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

exports.getOneCategory = async ({id}) => {
    try {
        let category = await Category.findById(id).populate("subCategory", "name description img");
        if (typeof category !== "object" || !category) {
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

        if (verify.success === true) {

            form.name = form.name.toLowerCase();
            form.name = form.name.capitalizeFirstLetter();
            let testCategorie = await Category.find({name: form.name});
            if (testCategorie.length > 0) {

                return {
                    success: false,
                    message: "La catégorie existe déjà",
                    categoryId: testCategorie._id
                }
            } else {
                const category = new Category({createdAt: new Date(), updateAt: new Date()});
                Object.assign(category, form);
                await category.save();
                return {
                    success: true,
                    categoryId: category._id
                };
            }
        } else {
            return {
                success: verify.success,
                message: verify.message,
                errors: verify.error,
                categoryId: verify.categoryId

            }
        }
    } catch (e) {
        throw e;
    }
}

exports.updateCategory = async (id, change) => {
    try {
        let verify = await verifyEntry(change, true, id, true);
        if (verify.success === true) {

            change.name = change.name.toLowerCase();
            change.name = change.name.capitalizeFirstLetter();

            await Category.findOneAndUpdate(
                {_id: id},
                change,
                {new: true}
            )
            return {
                success: true,
                message: "Votre catégorie a bien été modifiée",
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

exports.deleteCategoryById = async (id) => {
    try {
        let testCategorie = await Category.findById(id);
        if (!testCategorie) {
            return {
                success: false,
            }
        }
        await Category.deleteOne({_id: id})
        return {
            success: true
        }
    } catch (e) {
        throw e;
    }
}

/*----------- function for add update category -----------------*/

/*----------- VERIFY --------------*/
async function verifyEntry(category, checkValue = null, update = false) {
    if (checkValue !== null) {
        if (typeof category.name === "undefined") {
            return {
                success: false,
                message: "Vous devez définir une catégorie",
                error: "name"
            };

        } else if (typeof category.name !== "string") {
            return {
                success: false,
                message: "Vous devez rentrer des caractères alphabétiques pour votre catégorie",
                error: "name"
            };
        } else if (category.name.length < 3) {
            return {
                success: false,
                message: "3 caractères minimum pour votre catégorie",
                error: "name"
            };
        }
        category.name = category.name.toLowerCase();
        category.name = category.name.capitalizeFirstLetter();

        let nameExist = await Category.find({name: category.name});
        if (nameExist.length > 0 && update === false) {
            return {
                success: false,
                message: "Votre nom de catégorie existe déjà !",
                categoryId: nameExist[0]._id

            }
        } else if (update === true && nameExist.length > 0) {
            let updatedCategory = await Category.findById(id);
            if (updatedCategory.name !== category.name) {

                return {
                    success: false,
                    message: "Votre nom de catégorie existe déjà !",
                    categoryId: updatedCategory._id
                }
            }
        }

        if (typeof category.description === "undefined") {
            return {
                success: false,
                message: "Vous devez définir une description"
            };

        } else if (typeof category.description !== "string") {
            return {
                success: false,
                message: "Vous devez rentrer des caractères alphabétiques pour votre description",
                error: "name"
            };
        } else if (category.description.length < 5 || category.description.length > 100) {
            return {
                success: false,
                message: "5 à 100 caractères pour votre description",
                error: "name"
            };
        }
    }
    return {success: true};
}

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
