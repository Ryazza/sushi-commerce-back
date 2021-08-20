categories = require('./categories_data.json');
subCategories = require('./subCategories_data.json');
products = require('./products_data.json');

const CategoryService = require('../services/category.service')
const ProductService = require('../services/product.service')
const SubCategoryService = require("../services/subCategory.service");
const ShippingFeeService = require("../services/shippingFee.service");
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
    };
    let i = 0;
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

exports.pushProducts = async (products) => {
    let response = [];
    let i = 0;
    for (const product of products) {
        try {
            let newProduct = await ProductService.addProduct(product)

            if (newProduct.success === true) {
                response.push({name: product.name, result: newProduct})
                console.log(product.name, newProduct)
            } else {
                response.push({name: product.name, result: newProduct})
                console.log(product.name + " : new subCategory failed", newProduct)
            }
            response.push({name: product.name, id: newProduct._id})


        } catch (e) {

            console.log(e)
        }
        i++;

        if (i === products.length) {
            console.log("products.length = ", i)
            return response;

        }

    }

}
findCategory = (category, saveId) => {
    // console.log("category in find category=>", category)
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
    // console.log("find category", response)
    return response;
}

exports.exploitSaveId = (data, objectArray) => {
    // console.log("exploitSaveId",data.saveId)
    objectArray.forEach((object) => {
        object.category = findCategory(object, data);
    })
    return objectArray;
}
findId = (subCategory, saveId) => {
    // console.log("category in find category=>", category)
    let response = false;
    saveId.forEach(element => {
            // console.log("element.name = ", element.name);
            // console.log("category.category = ", category.category)
            if (element.name === subCategory.subCategoryId) {
                // console.log("return", element.id)
                response = element.id;
            }
        }
    )
    // console.log("find category", response)
    return response;
}

exports.changeProductsSubCategoryId = (data, objectArray) => {
    // console.log("IDs = ",data)
    // console.log("products = ", objectArray[0])
    objectArray.forEach((object) => {
        object.subCategoryId = findId(object, data);
    })
    return objectArray;
}

exports.pushShippingFees = async (items) => {
    let response = [];
    let i = 0;
    for (const item of items) {
        try {
            let newItem = ShippingFeeService.addShippingFee(item)

            if (newItem.success === true) {
                response.push({name: item.name, result: newItem})
                // console.log(subCategory.name, newSubCategory)
            } else {
                response.push({name: item.name, result: newItem})
                // console.log(subCategory.name + " : new subCategory failed", newSubCategory)
            }



        } catch (e) {

            console.log(e)
        }
        i++;

        if (i === items.length) {
            // console.log("saveId", saveId)

            return response;

        }

    }
}
