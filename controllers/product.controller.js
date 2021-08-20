const ProductService = require('../services/product.service')

exports.createProduct = async (req, res) => {
    try {
        let newProduct = await ProductService.addProduct(req.body)
        if (newProduct.success === true) {
            res.status(201)
            res.send(newProduct)
        } else {
            res.status(400)
            res.send(newProduct)
        }
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }

}

exports.updateProduct = async (req, res) => {
    try {
        let newProduct = await ProductService.updateProduct(req.body, req.params.id)
        if (newProduct.success === true) {
            res.status(201)
            res.send(newProduct)
        } else {
            res.status(400)
            res.send(newProduct)
        }

    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.updateProducts = async (req, res) => {
    try {
        let newProduct = await ProductService.updateProducts(req.body)
        if (newProduct.success === true) {
            res.status(201)
            res.send(newProduct)
        } else {
            res.status(400)
            res.send(newProduct)
        }

    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.getProducts = async (req, res) => {
    try {
        let allUser = await ProductService.allProducts();
        res.status(200);
        res.send(allUser);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.getOneProduct = async (req, res) => {
    try {
        let oneProduct = await ProductService.getOneProduct(req.params.id);
        if(oneProduct.success === false) {
            res.status(400);
            res.send(oneProduct);
        } else {
            res.status(200);
            res.send(oneProduct);
        }
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.showStock = async (req, res) => {
    try {
        let allProduct = await ProductService.showStock();
        res.status(200);
        res.send(allProduct);

    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.updateStock = async (req, res) => {
    try {
        let newProduct = await ProductService.updateStock(req.body)
        if (newProduct.success === true) {
            res.status(201)
            res.send(newProduct)
        } else {
            res.status(400)
            res.send(newProduct)
        }
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.deduceStock = async (req, res) => {
    try {
        let newProduct = await ProductService.deduceStock(req.body, req.params.id)
        if (newProduct.success === true) {
            res.status(201)
            res.send(newProduct)
        } else {
            res.status(400)
            res.send(newProduct)
        }
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.addStock = async (req, res) => {
    try {
        let newProduct = await ProductService.addStock(req.body, req.params.id)
        if (newProduct.success === true) {
            res.status(201)
            res.send(newProduct)
        } else {
            res.status(400)
            res.send(newProduct)
        }

    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}


exports.searchProductByName = async (req, res) => {
    try {
        let products = await ProductService.searchProductByName(req.params.keyword);
        res.status(200);
        res.send(products);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.searchOneProduct = async (req, res) => {
    try {
        let products = await ProductService.searchOneProduct(req.params.id);
        res.status(200);
        res.send(products);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }

}


exports.sortProducts = async (req, res) => {
    let type =  req.params.type;
    if (type !== "name" && type !=="category" && type !== "description" && type !=="views"){
        res.status(400);
        res.send({
            success: false,
            errors: "veuillez préciser 'name', 'category', 'views ou 'description"
        })
    }
    try {
        let products = await ProductService.sortProducts(type);
        res.status(200);
        res.send(products);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }

}

exports.deleteProduct = async (req,res)=>{
    try {
        let products = await ProductService.deleteProduct(req.params.id);
        res.status(200);
        res.send(products);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}
exports.deleteProducts = async (req,res)=>{
    try {
        let products = await ProductService.deleteProducts(req.body);
        res.status(200);
        res.send(products);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}
exports.updateAvailable = async (req,res)=>{
    try {
        let products = await ProductService.updateAvailable(req.body);
        res.status(200);
        res.send(products);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }
}
exports.updateEvent = async (req,res)=>{
    if (req.params.event !== "new" && req.params.event !=="discount" && req.params.event !== "endOfSerie"){
        res.status(400);
        res.send({
            success: false,
            errors: "veuillez préciser 'name', 'category', 'views ou 'description"
        })
    }
    try {

        let result = await ProductService.updateEvent(req.body, req.params.event);
        res.status(200);
        res.send(result);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e,
        })
    }
}
exports.findBestSales = async (req, res) => {
    try {
        let products = await ProductService.findBestSales(req.params.type);
        res.status(200);
        res.send(products);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e
        })
    }

}