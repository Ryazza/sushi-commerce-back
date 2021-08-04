const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategory.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

/*---------------- USER -----------------*/

router.get('/All', subCategoryController.getAllSubCategory);
router.get('/:id/products', subCategoryController.getOneSubCategoryAndProduct);
router.get('/:id', subCategoryController.getOneSubCategory);


/*--------------- ADMIN -----------------*/

router.post('/', checkTokenMiddleware.checkToken, subCategoryController.createSubCategory)

router.put('/:id', checkTokenMiddleware.checkToken, subCategoryController.updateSubCategory)

router.delete('/:id', checkTokenMiddleware.checkToken, subCategoryController.deleteSubCategory)

module.exports = router;
