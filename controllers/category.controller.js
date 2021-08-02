const CategoryService = require('../services/category.service')
const checkTokenMiddleware = require('../controllers/jwt.controller');

/*------------------------ USER -------------------------------*/

exports.getAllCategory = async (req, res) => {

    try {
        let allCategory = await CategoryService.getAllCategory();
        res.status(200);
        res.send(allCategory);
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}

exports.getOneCategory = async (req, res) => {
    try {
        let oneCategory = await CategoryService.getOneCategory(req.params);
        res.status(200);
        res.send(oneCategory);
    } catch (e) {

        console.log("catch" + e);
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}

/*------------------------ ADMIN -------------------------------*/

exports.createCategory = async (req, res) => {
    try {
        const token = req.headers.authorization && checkTokenMiddleware.extractBearerToken(req.headers.authorization);

        let newCategory = await CategoryService.createCategory(req.body, token)

        if (newCategory.success === true) {
            res.status(201)
            res.send(newCategory)
        } else {
            res.status(400)
            res.send(newCategory)
        }

    } catch (e) {
        console.log("create category catch", e);
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const token = req.headers.authorization && checkTokenMiddleware.extractBearerToken(req.headers.authorization);

        let categoryServiceRes = await CategoryService.updateCategory(req.params.id , req.body, token);

        if (categoryServiceRes.success) {
            res.status(200);
            res.send(categoryServiceRes);
        } else {
            res.status(400);
            res.send(categoryServiceRes);
        }
    } catch (e) {
        console.log("update category catch " , e)
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}

exports.deleteCategory = async ( req, res ) => {
    try {

        const token = req.headers.authorization && checkTokenMiddleware.extractBearerToken(req.headers.authorization);
        let category = await CategoryService.deleteCategoryById(req.params.id, token);
        if (category.success) {
            res.status(200);
            res.send({
                success: true,
                errors: "Sous-catégorie supprimée avec succès!"
            })

        } else {
            res.status(400)
            res.send({
                success: false,
                errors: "Sous-catégorie non valide!"
            })
        }
    } catch (e) {
        throw e;
    }
}
