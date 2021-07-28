const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

router.get('/all', checkTokenMiddleware.checkTokenAdmin ,userController.allUser);
router.delete('/:id' , checkTokenMiddleware.checkTokenAdmin, userController.deleteUserById);
router.put('/email/:id', checkTokenMiddleware.checkTokenAdmin, userController.updateMailAdmin);
router.put('/role/:id', checkTokenMiddleware.checkTokenAdmin, userController.updateRole);

module.exports = router;