categories = require('./categories_data.json');
subCategories = require('./subCategories_data.json');
const CategoryService = require('../services/category.service')
const SubCategoryService = require('../services/subCategory.service')
const res = require("express");
const index = require("../server");
let i = 0;
let saveId=[]


categories.forEach(async category => {

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
        console.log("saveId", saveId)

        return true;
    }

})

