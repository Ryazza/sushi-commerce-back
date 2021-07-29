const express = require('express');
const router = express.Router();
const underCategoryController = require('../controllers/underCategory.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

/*---------------- USER -----------------*/

router.get('/All', underCategoryController.getAllUnderCategory)
router.get('/:id', underCategoryController.getOneUnderCategory)

/*--------------- ADMIN -----------------*/

router.post('/', checkTokenMiddleware.checkToken, underCategoryController.createUnderCategory)

router.put('/:id', checkTokenMiddleware.checkToken, underCategoryController.updateUnderCategory)

router.delete('/:id', checkTokenMiddleware.checkToken, underCategoryController.deleteUnderCategory)

module.exports = router;
