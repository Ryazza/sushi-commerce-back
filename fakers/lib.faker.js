categories = require('./categories_data.json');
subCategories = require('./subCategories_data.json');
const CategoryService = require('../services/category.service')

const SubCategoryService = require("../services/subCategory.service");
let saveId = []
let i=0


exports.pushCategories = async (categories) => {

    for (const category of categories) {
        try {
            let newCategory = await CategoryService.createCategory(category)

            if (newCategory.success === true) {
                console.log(category.name, newCategory)
            } else {
                console.log(category.name + " new category failed", newCategory)
            }
            saveId.push({name: category.name, id: newCategory.categoryId})

        } catch (e) {

            console.log(e)
        }
        i++;
        if (i === categories.length) {
            // console.log("saveId", saveId)

            return true;
        }

    }
}
exports.pushSubCategories = async (subCategories) => {
    let response = [];
    let i=0;
    for (const subCategory of subCategories) {
        try {
            let newSubCategory = await SubCategoryService.createSubCategory(subCategory)

            if (newSubCategory.success === true) {
                response.push({name:subCategory.name, result:newSubCategory  })
                console.log(subCategory.name, newSubCategory)
            } else {
                response.push({name:subCategory.name, result:newSubCategory  })

                console.log(subCategory.name + " : new subCategory failed", newSubCategory)
            }
            saveId.push({name: subCategory.name, id: newSubCategory.subCategoryId})


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