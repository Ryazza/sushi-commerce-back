const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const dayjs = require("dayjs");
let isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

exports.addOrder = async (form, user) => {

    try {
        let verify = await verifyEntry(form);

        if (verify.success === true) {
            // calcul function totalAmount and other;
            let formValid = await calculate(form);
            formValid.form.client_ID = user.id;
            if (form.status || form.status.trim() !== '') {
                form.status = "payée";
            }
            const order = new Order({createdAt: new Date(), updateAt: new Date(), status: "payée"});
            Object.assign(order, formValid.form);
            let canSave = true;
            let insufficientStock = '';
            formValid.changeStock.forEach(product => {
                if (product.canChangeStock === false) {
                    insufficientStock += product.id + ' ';
                    canSave = false;
                }
            });
            if (canSave) {
                await order.save();
                for (let i = 0; i < formValid.changeStock.length; i++) {
                    let product = await Product.findOne({_id: formValid.changeStock[i].id});
                    product.quantity = formValid.changeStock[i].quantity;
                    product.available = formValid.changeStock[i].available;
                    product.sale = formValid.form.articles[i].sale;

                    await Product.updateOne({_id: formValid.changeStock[i].id}, product);
                }
                return {
                    success: true
                };
            } else {
                return {
                    success: false,
                    message: "Les produits suivants n'ont pas de stock suffisant " + insufficientStock + "!"
                };
            }
        } else {
            return {
                success: verify.success,
                message: verify.message,
                errors: verify.error
            }
        }
    } catch (e) {
        throw e;
    }
}

exports.calculateOrder = async (form) => {

    try {
        let verify = await verifyEntry(form);

        if (verify.success === true) {

            // calcul function totalAmount and other;
            let formValid = await calculate(form);
            let canSend = true;
            formValid.changeStock.forEach(product => {
                if (product.canChangeStock === false) {
                    canSend = false;
                }
            });

            return {
                success: true,
                response: {formValid, canOrder: canSend},
            };
        } else {
            return {
                success: verify.success,
                message: verify.message,
                errors: verify.error
            }
        }
    } catch (e) {
        throw e;
    }
}

exports.getAllOrder = async () => {
    try {
        let orders = await Order.find({})
        return {
            success: true,
            order: orders
        }
    } catch (e) {
        throw (e)
    }

}

exports.getOrderByIdAdmin = async (id) => {
    try {
        let orders = await Order.findById(id)
        return {
            success: true,
            order: orders
        }
    } catch (e) {
        throw (e)
    }

}

exports.getOneOrder = async (id) => { //todo check si la comande est bien a l'utilisateur
    try {
        let order = await Order.findOne({_id: id})
        if (order) {
            return {
                success: true,
                order: order
            }
        } else {
            return {
                success: false,
                error: "ID invalide"
            }
        }
    } catch (e) {
        throw e;
    }
}

exports.getOrderByUser = async (client_id) => {
    try {
        let orders = await Order.find({client_ID: client_id}).sort({_id: -1})
        if (typeof orders === "object" && orders.length > 0) {
            return {
                success: true,
                order: orders
            }
        } else {
            return {
                success: false,
            }
        }
    } catch (e) {
        throw e;
    }
}

exports.updateOrder = async (id, change) => { //todo vérifier si la commande appartien bien au client

    try {
        let order = await Order.findById(id);

        if (!order) {
            return {
                success: false,
                message: "Numéro de commande incorrect",
            }
        }

        let verify = await verifyEntry(change);

        if (verify.success === true) {
            // calcul function totalAmount and other;

            let changeValid = await calculate(change);

            changeValid.client_ID = order.client_ID;

            await Order.findOneAndUpdate(
                {_id: id},
                changeValid,
                {new: true}
            )

            return {
                success: true,
                message: "Votre Commande a bien été modifiée",
                order: changeValid,
            };
        } else {
            return {
                success: verify.success,
                message: verify.message,
                errors: verify.errors,
            }
        }
    } catch (e) {
        throw e;
    }
}

exports.deleteOrderById = async (id) => {
    try {
        let response = await Order.deleteOne({_id: id})
        if (response) {
            return {
                success: true
            }
        } else {
            return {
                success: false
            }
        }
    } catch (e) {
        throw e;
    }
}
//----------------------- ADMIN ---------------------------//
exports.getAllOrderByStatus = async (status, order) => {
    try {
        if ((status === "payée" || status === "expédiée") && (order === "desc" || order === 'asc')) {
            let inOrder;
            order === "desc" ? inOrder = -1 : inOrder = 1;
            let orders = await Order.find({status: status}).sort({_id: inOrder})
            return {
                success: true,
                order: orders
            }
        } else {
            return {
                success: false,
                message: "Demande incorrecte",
            }
        }
    } catch (e) {
        throw (e)
    }
}

/*----------- function for add updtate order -----------------*/

async function calculate(form) {

    let articles = [];
    let changeStock = [];
    let available;
    let canChangeStock;
    let totalAmount = 0;

    for (let i = 0; i < form.articles.length; i++) {
        let product = await Product.findById(form.articles[i].id).populate({path: "subCategoryId", populate: {path: "category", select: "_id name"}, select: "_id name"});
        let oldQuantity = product.quantity;
        let newQuantity = oldQuantity - form.articles[i].quantity;

        if (newQuantity < 0) {
            canChangeStock = false;
            available = false;
        } else if (newQuantity === 0) {
            canChangeStock = true;
            available = false;
        } else {
            canChangeStock = true;
            available = true;
        }
        changeStock.push({id: form.articles[i].id, quantity: newQuantity, available: available, canChangeStock: canChangeStock})

        let amount = product.price * form.articles[i].quantity;
        let sale;

        if (typeof product.sale === "undefined") {

            sale = parseInt(form.articles[i].quantity);
        } else {
            sale = parseInt(product.sale) + parseInt(form.articles[i].quantity);
        }

        articles.push({
            id: product.id,
            pictures: product.pictures,
            name: product.name,
            events: product.events,
            category: product.subCategoryId.category.name,
            subCategory: product.subCategoryId.name,
            brand: product.brand,
            description: product.description,
            price: product.price,
            sale: sale,
            quantityBuy: form.articles[i].quantity,
            amount: amount
        });
        totalAmount += amount;
    }

    /*----------------------- A lier au systeme fraix de port -------------------------*/
    let shipping_fee = 10;
    /*------------------------------------ End ---------------------------------------*/

    let gift_package;

    if (totalAmount > 200) {
        gift_package = true;
    } else {
        gift_package = false;
    }

    let today = new Date();

    if (today.getMonth() === 11 && today.getDate() > 5) {
        gift_package = true;
    } else if (dayjs(dayjs().year() + "-" + dayjs().get('month') + "-" + dayjs().get('date')).isBetween(dayjs().year() + '6-15', dayjs().year() + '7-15')) {
        gift_package = true;
    }

    form.gift_package = gift_package;
    form.shipping_fee = shipping_fee;
    form.articles = articles;
    form.totalAmount = totalAmount + shipping_fee;
    return {form: form, changeStock: changeStock};
}

/*----------- VERIFY --------------*/
verifyEntry = async (order) => {

    if (typeof order.articles === "undefined") {
        return {
            success: false,
            message: "Vous devez enregistrer un article pour une commande",
            errors: "articles"
        };
    } else {

        for (let i = 0; i < order.articles.length; i++) {
            let verifId = checkObjectId(order.articles[i].id);
            let verifProduct;
            let actualNbr = i + 1;
            if (verifId.success === true) {
                verifProduct = await Product.findById(order.articles[i].id);
            } else {
                return {
                    success: false,
                    message: "Vous devez enregistrer un id correct pour votre article " + actualNbr + ": " + verifId.message,
                    errors: "article.id"
                };
            }

            if (!verifProduct) {
                return {
                    success: false,
                    message: "Votre article " + actualNbr + " n'est pas reconnu " + order.articles[i].id,
                    errors: "article.id"
                };
            }

            if (typeof order.articles[i].quantity === "undefined") {
                return {
                    success: false,
                    message: "Vous devez renseigner une quantité à votre article " + order.articles[i].id + " !",
                    errors: "article.quantity"
                };
            }

            if (typeof order.articles[i].quantity !== "number") {
                return {
                    success: false,
                    message: "La quantité de votre article doit être un chiffre !",
                    errors: "article.quantity"
                };
            }
        }
        return {success: true};
    }
}

// CHANGER LE STATUT D'UNE COMMANDE - de payée à expédiée //

exports.updateStatus = async (id) => {
    try {
        await Order.updateOne({_id: id}, {status: "expédiée"})
        return {
            success: true,
        }
    } catch (e) {
        throw (e)
    }
}

