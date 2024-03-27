const { fetchUserByEmail } = require('../dao/user.dao');
const userService = require('../services/user.service');
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const constant = require('../utils/constant');
const { validationResult } = require('express-validator');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await fetchUserByEmail(email)
    if (!user.length) {
      return res.status(401).json({ success: false, message: constant.invalidEmailOrPassword });
    }
    if (!await bcrypt.compare(password, user[0].password)) {
      return res.status(401).json({ message: constant.invalidEmailOrPassword });
    }
    const token = await jwt.sign({ id: user[0]._id }, constant.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({
      success: true,
      message: constant.userSuccessfullyLoggedIn,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const createUserController = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Bad Request', error: errors.array() });
    }
    const { email, password } = req.body
    const existingUser = await fetchUserByEmail(email)
    if (existingUser.length) {
      return res.status(409).json({ success: false, message: constant.emailAlreadyExists });
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const userDetails = { ...req.body, password: hashPassword }
    const createUser = await userService.createUserService(userDetails);
    res.status(201).json({
      success: true,
      message: constant.userCreatedSuccessfully,
      data: createUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const fetchUserController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'name'; // Default sorting by name
    const sortOrder = parseInt(req.query.sortOrder) || 1;

    const filter = {};
    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: 'i' };
    }
    if (req.query.email) {
      filter.email = { $regex: req.query.email, $options: 'i' };
    }
    if (req.query.phone) {
      filter.phone = parseInt(req.query.phone);
    }

    const createdUser = await userService.fetchUsersService({
      skip, limit, sortBy, sortOrder, filter
    });
    res.status(200).json({
      success: true,
      message: constant.fetchUsersListSuccessfully,
      data: createdUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateUserController = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Bad Request', error: errors.array() });
    }
    const userId = req.params.id
    const userDetails = req.body
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: constant.inValidUserId, data: {} });
    }
    const existingUser = await fetchUserByEmail(userDetails.email)
    if (existingUser.length) {
      return res.status(409).json({ success: false, message: constant.emailAlreadyExists });
    }
    const hashPassword = await bcrypt.hash(userDetails.password, 10)
    const userData = { ...userDetails, password: hashPassword }
    const updateUser = await userService.updateUserService(userId, userData);
    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: constant.notAbleToUpdateUser,
        data: {}
      });
    }
    res.status(200).json({
      success: true,
      message: constant.updateUserSuccessfully,
      data: updateUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: constant.inValidUserId, data: {} });
    }
    const deletedUser = await userService.deleteUserService(userId);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: constant.notAbleToDeleteUser, data: {} });
    }
    res.status(200).json({
      success: true,
      message: constant.deleteUserSuccessfully,
      data: deletedUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUserController,
  fetchUserController,
  updateUserController,
  deleteUserController,
  loginController
}
