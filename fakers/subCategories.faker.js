categories = require('./categories_data.json');
subCategories = require('./subCategories_data.json');
const CategoryService = require('../services/category.service')
const SubCategoryService = require('../services/subCategory.service')
const res = require("express");
const index = require("../server");
let i = 0;
let saveId=[]






    subCategories.forEach(async subCategory => {

        try {
            let newSubCategory = await SubCategoryService.createSubCategory(subCategory)

            if (newSubCategory.success === true) {
                console.log(subCategory.name, newSubCategory)
            } else {
                console.log( subCategory.name+" new subCategory failed", newSubCategory)
            }

        } catch (e) {

            console.log(e)
        }
        i++;
        if (i === subCategories.length) {
            return true;

        }
    })
