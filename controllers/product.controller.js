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
            errors: e.errors
        })
    }

}

exports.updateProduct = async (req, res) => {
    try {
        console.log("mes couilles")
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
            errors: e.errors
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
            errors: e.errors
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
            errors: e.errors
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
            errors: e.errors
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
            errors: e.errors
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
            errors: e.errors
        })
    }
}


exports.searchProductByName = async (req, res) => {
    try {
        let keyword = req.params.keyword;

        let products = await ProductService.searchProductByName(keyword);
        res.status(200);
        res.send(products);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        })
    }
}

exports.searchOneProduct = async (req, res) => {
    try {
        let id = req.params.id;

        let products = await ProductService.searchOneProduct(id);
        res.status(200);
        res.send(products);
    } catch (e) {
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
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
            errors: e.errors
        })
    }

}
