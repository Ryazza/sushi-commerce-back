categories = require('./categories_data.json');
subCategories = require('./subCategories_data.json');
const CategoryService = require('../services/category.service')

const SubCategoryService = require("../services/subCategory.service");
let i = 0


exports.pushCategories = async (categories) => {
    let response = {
        saveId: [],
        result: []
    };
    for (const category of categories) {
        try {
            let newCategory = await CategoryService.createCategory(category)

            if (newCategory.success === true) {
                response.result.push({name: category.name, result: newCategory})
                // console.log(category.name, newCategory)
            } else {
                response.result.push({name: category.name, result: newCategory})
                // console.log(category.name + " new category failed", newCategory)
            }
            response.saveId.push({name: category.name, id: newCategory.categoryId})

        } catch (e) {

            console.log(e)
        }
        i++;
        if (i === categories.length) {
            // console.log("saveId", saveId)
            return response;
        }

    }
}
exports.pushSubCategories = async (subCategories) => {
    let response = {
        saveId: [],
        result: []
    };    let i = 0;
    for (const subCategory of subCategories) {
        try {
            let newSubCategory = await SubCategoryService.createSubCategory(subCategory)

            if (newSubCategory.success === true) {
                response.result.push({name: subCategory.name, result: newSubCategory})
                // console.log(subCategory.name, newSubCategory)
            } else {
                response.result.push({name: subCategory.name, result: newSubCategory})
                // console.log(subCategory.name + " : new subCategory failed", newSubCategory)
            }
            response.saveId.push({name: subCategory.name, id: newSubCategory.subCategoryId})


        } catch (e) {

            console.log(e)
        }
        i++;

        if (i === subCategories.length) {
            // console.log("saveId", saveId)

            return response;

        }

    }
}