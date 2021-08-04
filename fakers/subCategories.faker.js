categories = require('./categories_data.json');
subCategories = require('./subCategories_data.json');
const SubCategoryService = require('../services/subCategory.service')
const res = require("express");
const index = require("../server");
let i = 0;
let saveId = []


// subCategories.forEach(async subCategory => {
//
//     try {
//         let newSubCategory = await SubCategoryService.createSubCategory(subCategory)
//
//         if (newSubCategory.success === true) {
//             console.log(subCategory.name, newSubCategory)
//         } else {
//             // console.log( subCategory.name+" : new subCategory failed", newSubCategory)
//         }
//         saveId.push({name: subCategory.name, id: newSubCategory.subCategoryId})
//
//
//     } catch (e) {
//
//         console.log(e)
//     }
//     i++;
//     if (i === subCategories.length) {
//         console.log("saveId", saveId)
//
//         return true;
//
//     }
// })
