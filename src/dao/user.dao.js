const userModel = require('../models/user.model')

const createUserDao = async (userDetails) => {
  try {
    const user = new userModel(userDetails)
    return user.save()
  } catch (error) {
    throw error
  }
}

const fetchUserByEmail = async (email) => {
  try {
    return await userModel.find({ email })
  } catch (error) {
    throw error
  }
}

const fetchUsersDao = async ({ skip, limit, sortBy, sortOrder, filter }) => {
  try {
    return await userModel.find(filter).sort({ [sortBy]: sortOrder }).skip(skip).limit(limit)
  } catch (error) {
    throw error
  }
}

const updateUsersDao = async (userId, userDetails) => {
  try {
    return await userModel.findByIdAndUpdate(userId, userDetails)
  } catch (error) {
    throw error
  }
}

const deleteUsersDao = async (userId) => {
  try {
    return await userModel.findByIdAndDelete(userId)
  } catch (error) {
    throw error
  }
}


module.exports = {
  createUserDao,
  fetchUsersDao,
  updateUsersDao,
  deleteUsersDao,
  fetchUserByEmail
}