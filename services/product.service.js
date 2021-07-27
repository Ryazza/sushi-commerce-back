const Product = require('../models/productModel.js');
const { checkObjectId } = require('../helper/dbHelper');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

function checkForm(form) {
    if (form.name.length > 25 || form.name.length < 3) {
        return {
            success: false,
            error: "le nom du produit doit comprendre entre 3 et 25 caractères"
        }
    }
    if (form.category.length > 25 || form.category.length < 3) {
        return {
            success: false,
            error: "le nom de catégorie doit comprendre entre 3 et 25 caractères"
        }
    }
    if (form.description.length > 255) {
        return {
            success: false,
            error: "la description doit être inférieure à 255 caractères"
        }
    }
    if (!form.pictures) {
        return {
            success: false,
            error: "il n'y a pas d'images"
        }
    }
    if (!form.stock) {
        return {
            success: false,
            error: "il n'y a pas de stock"
        }
    }
    if(typeof form.price !== "number"){
        return {
            success:false,
        error: "le prix doit être un nombre"
        }
    }
    if(!form.price){
        return {
            success:false,
        error: "le prix doit être indiqué"
        }
    }
}

async function checkStockUpdate(form) {

    let verifId = checkObjectId(form.id);

    if (!verifId.success) {
        return {
            success: false,
            error: "Vous devez rentrer un id correct " + verifId.message
        }
    } else {

        let product = await Product.findById(form.id)
        if (!product) {
            return {
                success: false,
                error: "Votre produit "+ form.id +" n'existe plus !"
            }
        }
    }

    if(typeof form.quantity !== "number"){
        return {
            success:false,
            error: "la quantité doit être un nombre"
        }
    }
    if(!form.quantity){
        return {
            success:false,
            error: "la quantité doit être indiqué"
        }
    }
    if(typeof form.available !== "boolean"){
        return {
            success:false,
            error: "Disponible doit être définit"
        }
    }
    if(!form.available){
        return {
            success:false,
            error: "Disponible doit être indiqué"
        }
    }
    return { success: true };
}

exports.addProduct = async (form) => {

    checkForm(form);
    try {
        const product = new Product({createdAt: new Date()});
        Object.assign(product, form);
        await product.save();
        return {
            success: true
        };
    } catch (e) {
        throw e;
    }
}

exports.updateProduct = async (form, id) => {
    checkForm(form);
    try {
        let product = await Product.findOneAndUpdate({_id: id}, {
                name: form.name,
                category: form.category,
                description: form.description ,
                pictures: form.pictures,
                events: form.events,
                stock:form.stock
            }
        );
        Object.assign(product, form);
        await product.save();
        return {
            success: true
        };
    } catch (e) {
        throw e;
    }
}


exports.allProducts = async () => {
    try {
        let products = await Product.find({})
        return {
            success: true,
            products: products
        }
    } catch (e) {
        throw e;
    }
}
exports.mostViewedProducts = async () => {
    try {
        let products = await Product.find({}).sort({views: -1})
        return {
            success: true,
            products: products
        }
    } catch (e) {
        throw e;
    }
}

exports.searchProductByName = async (keyword) => {
    try {
        let products = await Product.find({name: {$regex: keyword, $options: "i"}})

        return {
            success: true,
            products: products
        }
    } catch (e) {
        throw e;
    }
}

exports.searchOneProduct = async (id) => {
    try {
        let product = await Product.findOneAndUpdate({_id: id}, {
            $inc: {
                views: +1
            }
        });

        return {
            success: true,
            products: product
        }
    } catch (e) {
        throw e;
    }
}

/*---------------------- ADMIN -----------------------*/

exports.showStock = async () => {
    try {
        let products = await Product.find().sort({quantity: 1});
        return {
            success: true,
            products: products
        }
    } catch (e) {
        throw e;
    }
}

exports.updateStock = async (form) => {
    try {
        let checkAll = true;
        let lastCheck = {};

        if(typeof form.products === "undefined") {
            checkAll = false;
            lastCheck.success = false;
            lastCheck.error = "Vous devez renseigner un ou des articles à modifier";
        } else {

            for (let i=0; i < form.products.length; i++) {
                let check = await checkStockUpdate(form.products[i]);

                if(check.success === false) {
                    checkAll = false;
                    lastCheck.error = check.error;
                }
            }
        }

        if(checkAll) {
            for(let i=0; i < form.products.length; i++) {
                await Product.findOneAndUpdate({_id: form.products[i].id}, {
                        quantity: form.products[i].quantity,
                        available: form.products[i].available,
                    }
                );
            }
            return {
                success: true
            };
        } else {
            return {
                success: false,
                message: lastCheck.error
            };
        }

    } catch (e) {
        throw e;
    }
}

