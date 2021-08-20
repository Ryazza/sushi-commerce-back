const subCategoryService = require('../services/subCategory.service')

/*------------------------ USER -------------------------------*/

exports.getAllSubCategory = async (req, res) => {

    try {
        let allSubCategory = await subCategoryService.getAllSubCategory();
        res.status(200);
        res.send(allSubCategory);
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.getOneSubCategory = async (req, res) => {
    try {
        let oneSubCategory = await subCategoryService.getOneSubCategory(req.params);
        res.status(200);
        res.send(oneSubCategory);
    } catch (e) {

        console.log( e);
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.getOneSubCategoryAndProduct = async (req, res) => {
    try {
        let oneSubCategory = await subCategoryService.getOneSubCategoryAndProduct(req.params);
        res.status(200);
        res.send(oneSubCategory);
    } catch (e) {

        console.log(e);
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}

/*------------------------ ADMIN -------------------------------*/

exports.getOneSubCategoryAndProductAdmin = async (req, res) => {
    try {
        let oneSubCategory = await subCategoryService.getOneSubCategoryAndProductAdmin(req.params);
        res.status(200);
        res.send(oneSubCategory);
    } catch (e) {

        console.log(e);
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.createSubCategory = async (req, res) => {
    try {
        let newSubCategory = await subCategoryService.createSubCategory(req.body)

        if (newSubCategory.success === true) {
            res.status(201)
            res.send(newSubCategory)
        } else {
            res.status(400)
            res.send(newSubCategory)
        }

    } catch (e) {
        console.log(e);
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.updateSubCategory = async (req, res) => {
    try {
        let subCategoryServiceRes = await subCategoryService.updateSubCategory(req.params.id , req.body);
        if (subCategoryServiceRes.success) {
            res.status(200);
            res.send(subCategoryServiceRes);
        } else {
            res.status(400);
            res.send(subCategoryServiceRes);
        }
    } catch (e) {
        console.log(e)
        res.status(400);
        res.send({
            success: false,
            errors: e
        });
    }
}

exports.deleteSubCategory = async ( req, res ) => {
    try {

        let subCategory = await subCategoryService.deleteSubCategoryById(req.params.id);
        if (subCategory.success) {
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
