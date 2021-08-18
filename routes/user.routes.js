const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

router.post('/', userController.addUser)
router.post('/login', userController.connectUser)

router.get('/', checkTokenMiddleware.checkToken, userController.getMe)
router.get('/', checkTokenMiddleware.checkToken, userController.getMyAdress)

router.delete('/' , checkTokenMiddleware.checkToken, userController.deleteUser)

router.put('/adress', checkTokenMiddleware.checkToken, userController.addAdress)
router.put('/email', checkTokenMiddleware.checkToken, userController.updateMail);
router.put('/birth', checkTokenMiddleware.checkToken, userController.updateBirth);
router.put('/password', checkTokenMiddleware.checkToken, userController.updateUserPass);

module.exports = router;
