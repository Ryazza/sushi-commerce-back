categories = require('./categories_data.json');
subCategories = require('./subCategories_data.json');
pushSubCategories = require('./subCategories.faker');
const CategoryService = require('../services/category.service')
const SubCategoryService = require('../services/subCategory.service')
const res = require("express");
const index = require("../server");
const {log} = require("debug");
let i = 0;
let saveId = []


// categories.forEach(async category => {
//
//     try {
//         let newCategory = await CategoryService.createCategory(category)
//
//         if (newCategory.success === true) {
//             console.log(category.name, newCategory)
//         } else {
//             console.log(category.name + " new category failed", newCategory)
//         }
//         saveId.push({name: category.name, id: newCategory.categoryId})
//
//     } catch (e) {
//
//         console.log(e)
//     }
//     i++;
//     if (i === categories.length) {
//         console.log("saveId", saveId)
//
//         return true;
//     }
//
// })
pushCategories = async (categories) => {

    for (const category of categories) {
        try {
            let newCategory = await CategoryService.createCategory(category)

            if (newCategory.success === true) {
                // console.log(category.name, newCategory)
            } else {
                // console.log(category.name + " new category failed", newCategory)
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
findCategory = (category, saveId) => {
    let response = false;
    saveId.forEach(element => {
            // console.log("element.name = ", element.name);
            // console.log("category.category = ", category.category)
            if (element.name === category.category) {
                // console.log("return", element.id)
                response = element.id;
            }
        }
    )
    return response;
}

exploitSaveId = (saveId) => {
    subCategories.forEach((subCategory) => {
        subCategory.category = findCategory(subCategory, saveId);
    })
    return subCategories;
}

pushCategories(categories)
    .then(r => exploitSaveId(saveId))
    // .then(r => console.log("okay", r))
    .then(r => pushSubCategories.pushDatas(r))
    .then(r => console.log('okay', r));

console.log("fin du script")