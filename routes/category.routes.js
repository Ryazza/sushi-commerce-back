const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

/*---------------- USER -----------------*/

router.get('/All', categoryController.getAllCategory)
router.get('/:id', categoryController.getOneCategory)

/*--------------- ADMIN -----------------*/

router.post('/', checkTokenMiddleware.checkToken, categoryController.createCategory)

router.put('/:id', checkTokenMiddleware.checkToken, categoryController.updateCategory)

router.delete('/:id', checkTokenMiddleware.checkToken, categoryController.deleteCategory)

module.exports = router;
