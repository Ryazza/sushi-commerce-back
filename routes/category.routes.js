const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

/*---------------- USER -----------------*/

router.get('/All', checkTokenMiddleware.checkToken, categoryController.getAllCategory)

/*--------------- ADMIN -----------------*/

router.post('/', checkTokenMiddleware.checkToken, categoryController.createCategory)

router.get('/:id', checkTokenMiddleware.checkToken, categoryController.getOneCategory)

router.put('/:id', checkTokenMiddleware.checkToken, categoryController.updatecategory)

router.delete('/:id', checkTokenMiddleware.checkToken, categoryController.deleteCategory)

module.exports = router;
