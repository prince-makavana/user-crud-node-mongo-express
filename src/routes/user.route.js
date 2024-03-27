const express = require('express');
const userController = require('../controllers/user.controller');
const { userSchema, verifyToken } = require('../middlewares/middleware');

const userRoute = express.Router()

userRoute.post('/login', userController.loginController)

userRoute.post('/user', userSchema, userController.createUserController) // Registration API so not add authentication
userRoute.get('/user', verifyToken, userController.fetchUserController)
userRoute.put('/user/:id', [verifyToken, userSchema], userController.updateUserController)
userRoute.delete('/user/:id', verifyToken, userController.deleteUserController)

module.exports = userRoute;
