const { checkSchema } = require('express-validator')
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/constant');

const userSchema = checkSchema({
  name: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'name is required.'
    },
  },
  email: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'email is required.'
    },
  },
  phone: {
    in: ['body'],
    trim: true,
    notEmpty: {
      errorMessage: 'phone is required.'
    }
  }
})

const deleteUser = checkSchema({
  id: {
    in: ['params'],
    trim: true,
    notEmpty: {
      errorMessage: 'User id is required.'
    }
  }
})

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'Token not provided' });
    }
    const authToken = token.split(' ')[1]
    const decoded = await jwt.verify(authToken, SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = {
  userSchema,
  deleteUser,
  verifyToken
}