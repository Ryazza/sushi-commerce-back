const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

router.post('/', userController.addUser);
router.post('/login', userController.connectUser);

router.get('/', checkTokenMiddleware.checkToken, userController.getMe);
router.get('/adress', checkTokenMiddleware.checkToken, userController.getMyAdress);

router.delete('/' , checkTokenMiddleware.checkToken, userController.deleteUser);
router.delete('/deleteAddress/:id', checkTokenMiddleware.checkToken, userController.deleteAdress);

router.put('/address', checkTokenMiddleware.checkToken, userController.addAdress);
router.put('/modifyAddress/:id', checkTokenMiddleware.checkToken, userController.updateAddress);
router.put('/email', checkTokenMiddleware.checkToken, userController.updateMail);
router.put('/birth', checkTokenMiddleware.checkToken, userController.updateBirth);
router.put('/password', checkTokenMiddleware.checkToken, userController.updateUserPass);

module.exports = router;
