const Product = require('../models/productModel.js');

function checkForm(form) {
    if (form.name.length > 25 || form.name.length < 3) {
        return {
            success: false,
            error: "le nom du produit doit contenir entre 3 et 25 caractères"
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
    if (typeof form.price !== "number") {
        return {
            success: false,
            error: "le prix doit être un nombre"
        }
    }
    if (!form.price) {
        return {
            success: false,
            error: "le prix doit être indiqué"
        }
    }
}

async function checkStockUpdate(form, id, availableAuto = false) {

    let product = await Product.findById(id)

    if (!product) {
        return {
            success: false,
            error: "Votre produit " + id + " n'existe pas !"
        }
    }
    if (typeof form.quantity !== "number") {
        return {
            success: false,
            error: "La quantité doit être un nombre"
        }
    }
    if (!form.quantity) {
        return {
            success: false,
            error: "La quantité doit être indiquée"
        }
    }
    if (!availableAuto) {
        if (typeof form.available !== "boolean") {
            return {
                success: false,
                error: "'Disponible' doit être définit"
            }
        }
        if (!form.available) {
            return {
                success: false,
                error: "'Disponible' doit être indiqué"
            }
        }
    }
    return {success: true};
}

exports.allProducts = async () => {
    try {
        let products = await Product.find({}).populate({
            path: "subCategoryId",
            populate: {path: "category", select: "_id name"},
            select: "_id name"
        });
        return {
            success: true,
            products: products
        }
    } catch (e) {
        throw e;
    }
}

exports.getOneProduct = async (id) => {

    try {
        let product = await Product.findById(id).populate({
            path: "subCategoryId",
            populate: {path: "category", select: "_id name"},
            select: "_id name"
        });

        if (!product) {
            return {
                success: false,
                error: "ID incorrect"
            }
        }

        let redoProduct = {
            _id: product.id,
            name: product.name,
            brand: product.brand,
            categoryId: product.subCategoryId.category.id,
            category: product.subCategoryId.category.name,
            subCategoryId: product.subCategoryId.id,
            subCategory: product.subCategoryId.name,
            description: product.description,
            bigPicture: product.bigPicture,
            pictures: product.pictures,
            events: product.events,
            quantity: product.quantity,
            available: product.available,
            price: product.price,
            view: product.view,
            sale: product.sale,
            createdAt: product.createdAt,
            comment: product.comment
        }
        return {
            success: true,
            products: redoProduct
        }
    } catch (e) {
        throw e;
    }
}

exports.searchProductByName = async (keyword) => {
    try {
        let products = await Product.find({name: {$regex: keyword, $options: "i"}}).populate({
            path: "subCategoryId",
            populate: {path: "category", select: "_id name"},
            select: "_id name"
        })

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
        }).populate({path: "subCategoryId", populate: {path: "category", select: "_id name"}, select: "_id name"});

        return {
            success: true,
            products: product
        }
    } catch (e) {
        throw e;
    }
}

/*---------------------- ADMIN -----------------------*/

exports.addProduct = async (form) => {

    checkForm(form);
    try {
        const product = new Product({createdAt: new Date(), views: 0});
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
                brand: form.brand,
                subCategoryId: form.subCategoryId,
                description: form.description,
                bigPicture: form.bigPicture,
                pictures: form.pictures,
                events: form.events,
                quantity: form.quantity,
                available: form.available,
                price: form.price,
                view: form.view,
                sale: form.sale,
                comment: form.comment,
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

exports.updateProducts = async (products) => {

    try {
        for (const product of products) {
            let currProduct = await Product.findOneAndUpdate({_id: product._id}, {
                    product
                }
            );
            Object.assign(currProduct, product);
            await currProduct.save();
        }
        return {
            success: true
        };
    } catch (e) {
        throw e;
    }
}

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

        if (typeof form.products === "undefined") {
            checkAll = false;
            lastCheck.success = false;
            lastCheck.error = "Vous devez renseigner un ou des articles à modifier";
        } else {

            for (let i = 0; i < form.products.length; i++) {
                let check = await checkStockUpdate(form.products[i], form.products[i].id);

                if (check.success === false) {
                    checkAll = false;
                    lastCheck.error = check.error;
                }
            }
        }

        if (checkAll) {
            for (let i = 0; i < form.products.length; i++) {
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

exports.deduceStock = async (form, id) => {
    try {
        let check = await checkStockUpdate(form, id, true);

        if (check.success) {
            let originProduct = await Product.findOne({_id: id});
            let stayNumber = originProduct.quantity - form.quantity;

            let response = await moreOrLess(id, stayNumber);
            return response;

        } else {
            return {
                success: false,
                message: check.error
            };
        }

    } catch (e) {
        throw e;
    }
}

exports.addStock = async (form, id) => {
    try {
        let check = await checkStockUpdate(form, id, true);

        if (check.success) {
            let originProduct = await Product.findOne({_id: id});
            let stayNumber = originProduct.quantity + form.quantity;

            let response = await moreOrLess(id, stayNumber);
            return response;

        } else {
            return {
                success: false,
                message: check.error
            };
        }

    } catch (e) {
        throw e;
    }
}

async function moreOrLess(id, stayNumber) {
    if (stayNumber > -1) {
        let available = true;
        if (stayNumber === 0) {
            available = false;
        }
        let product = await Product.findOneAndUpdate({_id: id}, {
                quantity: stayNumber,
                available: available,
            }
        );

        await product.save();
        return {
            success: true,
            message: "Votre produit a été mis à jour! nouvelle quantité :" + stayNumber
        };
    } else {
        return {
            success: false,
            message: 'Votre produit est déjà épuisé ou la quantité a déduire trop grande!'
        };
    }
}


exports.sortProducts = async (type) => {
    if (type === "name") {
        try {
            let products = await Product.find({}).sort({name: 1}).populate({
                path: "subCategoryId",
                populate: {path: "category", select: "_id name"},
                select: "_id name"
            });
            return {
                success: true,
                products: products
            }
        } catch (e) {
            throw e;
        }
    }
    if (type === "category") {
        try {
            let products = await Product.find({}).sort({category: 1}).populate({
                path: "subCategoryId",
                populate: {path: "category", select: "_id name"},
                select: "_id name"
            });
            return {
                success: true,
                products: products
            }
        } catch (e) {
            throw e;
        }
    }
    if (type === "description") {
        try {
            let products = await Product.find({}).sort({description: 1}).populate({
                path: "subCategoryId",
                populate: {path: "category", select: "_id name"},
                select: "_id name"
            });
            return {
                success: true,
                products: products
            }
        } catch (e) {
            throw e;
        }
    }
    if (type === "views") {
        try {
            let products = await Product.find({}).sort({views: -1}).populate({
                path: "subCategoryId",
                populate: {path: "category", select: "_id name"},
                select: "_id name"
            });
            return {
                success: true,
                products: products
            }
        } catch (e) {
            throw e;
        }
    }
}
exports.deleteProduct = async (id) => {
    await Product.deleteOne({_id: id});
    return {
        success: true
    };
}
exports.deleteProducts = async (products) => {
    for (const product of products) {
        await Product.deleteOne({_id: product.id});
    }
    return {
        success: true
    };
}

exports.updateAvailable = async (products) => {
    try {
        for (const product of products) {
            await Product.updateOne({_id: product.id}, {available: product.available});
        }
        return {
            success: true
        };
    } catch (e) {
        throw e;
    }

}
checkId = async (products) => {
    let result = {
        success: true
    };
    for (const product of products) {
        if (!product.id) {
            result += {
                success: false,
                error: "Chaque objet doit avoir un id"
            }
        }
        let search = await Product.exists({_id: product.id})
        if (!search) {
            result = {
                success: false,
                error: "Au moins une id n'existe pas"
            }
        }

    }
    return result;

}

exports.updateEvent = async (products, eventType) => {
    try {
        let check = await checkId(products);
        if (check.success === false) {
            return {
                success: false,
                error: check.error
            }
        }
        let result = [];
        for (const product of products) {
            let request
            try {
                let productToChange = await Product.findOne({_id: product.id})
                let event = productToChange.events
                if (eventType === "discount") {
                    event.discount = product.discount;
                }
                if (eventType === "new") {
                    event.new = product.new;
                }
                if (eventType === "endOfSerie") {
                    event.endOfSerie = product.endOfSerie;
                }
                request = await Product.updateOne({_id: product.id}, {events: event})
                result.push(request)
            } catch (e) {
                console.log(e);
            }
        }
        let message = "";
        result.forEach(item => {
            if (item.nModified === 0) {
                message = "Base de donnée non modifiée"
            } else {
                message = "Base de donnée modifiée avec succès"
            }
        })
        return {
            success: true,

            message: message,
        };
    } catch (e) {
        throw e;
    }


}

exports.findBestSales = async (type) => {
    if (type === "all") {
        try {
            let products = await Product.find({}).sort({sale: -1}).limit(6).populate({
                path: "subCategoryId",
                populate: {path: "category", select: "_id name"},
                select: "_id name"
            });
            return {
                success: true,
                products: products
            }
        } catch (e) {
            throw e;
        }
    } else {
        try {

            // let products = await Product.find({subCategoryId: type}).sort({sale: -1}).limit(6);
            return {
                success: true,
                products: await Product.find({subCategoryId: type}).sort({sale: -1}).limit(6)
            }
        } catch (e) {
            throw e;
        }
    }

}
