const underCategoryService = require('../services/underCategory.service')
const checkTokenMiddleware = require('../controllers/jwt.controller');


/*------------------------ USER -------------------------------*/

exports.getAllUnderCategory = async (req, res) => {

    try {
        let allUnderCategory = await underCategoryService.getAllUnderCategory();
        res.status(200);
        res.send(allUnderCategory);
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}

exports.getOneUnderCategory = async (req, res) => {
    try {
        let oneUnderCategory = await underCategoryService.getOneUnderCategory(req.params);
        res.status(200);
        res.send(oneUnderCategory);
    } catch (e) {

        console.log("catch" + e);
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}

exports.getOneSubCategoryAndProduct = async (req, res) => {
    try {
        let oneUnderCategory = await underCategoryService.getOneSubCategoryAndProduct(req.params);
        res.status(200);
        res.send(oneUnderCategory);
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

exports.createUnderCategory = async (req, res) => {
    try {
        const token = req.headers.authorization && checkTokenMiddleware.extractBearerToken(req.headers.authorization);

        let newUnderCategory = await underCategoryService.createUnderCategory(req.body, token)

        if (newUnderCategory.success === true) {
            res.status(201)
            res.send(newUnderCategory)
        } else {
            res.status(400)
            res.send(newUnderCategory)
        }

    } catch (e) {
        console.log("rentré catch"+ e);
        res.status(400)
        res.send({
            success: false,
            errors: e.errors
        })
    }
}

exports.updateUnderCategory = async (req, res) => {
    try {
        const token = req.headers.authorization && checkTokenMiddleware.extractBearerToken(req.headers.authorization);

        let underCategoryServiceRes = await underCategoryService.updateUnderCategory(req.params.id , req.body, token);

        if (underCategoryServiceRes.success) {
            res.status(200);
            res.send(underCategoryServiceRes);
        } else {
            res.status(400);
            res.send(underCategoryServiceRes);
        }
    } catch (e) {
        console.log("catch " + e)
        res.status(400);
        res.send({
            success: false,
            errors: e.errors
        });
    }
}

exports.deleteUnderCategory = async ( req, res ) => {
    try {

        const token = req.headers.authorization && checkTokenMiddleware.extractBearerToken(req.headers.authorization);
        let underCategory = await underCategoryService.deleteUnderCategoryById(req.params.id, token);
        if (underCategory.success) {
            res.status(200);
            res.send({
                success: true,
                errors: "Sous catégorie supprimée avec succès!"
            })

        } else {
            res.status(400)
            res.send({
                success: false,
                errors: "Sous catégorie non valide!"
            })
        }
    } catch (e) {
        throw e;
    }
}
