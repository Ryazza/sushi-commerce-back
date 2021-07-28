const Product = require('../models/productModel.js');

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

exports.sortProducts = async (type) => {
    if(type==="name") {
        try {
            let products = await Product.find({}).sort({name: -1})
            return {
                success: true,
                products: products
            }
        } catch (e) {
            throw e;
        }
    }
     if (type ==="category"){
        try {
            let products = await Product.find({}).sort({category: -1})
            return {
                success: true,
                products: products
            }
        } catch (e) {
            throw e;
        }
    }
     if (type ==="description"){
        try {
            let products = await Product.find({}).sort({description: -1})
            return {
                success: true,
                products: products
            }
        } catch (e) {
            throw e;
        }
    }
}
