const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategory.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

/*---------------- USER -----------------*/

router.get('/All', subCategoryController.getAllSubCategory);
router.get('/:id/products', subCategoryController.getOneSubCategoryAndProduct);
router.get('/:id', subCategoryController.getOneSubCategory);

/*--------------- ADMIN -----------------*/

router.get('/admin/:id/products', checkTokenMiddleware.checkTokenAdmin, subCategoryController.getOneSubCategoryAndProductAdmin);

router.post('/', checkTokenMiddleware.checkTokenAdmin, subCategoryController.createSubCategory)

router.put('/:id', checkTokenMiddleware.checkTokenAdmin, subCategoryController.updateSubCategory)

router.delete('/:id', checkTokenMiddleware.checkTokenAdmin, subCategoryController.deleteSubCategory)

module.exports = router;
