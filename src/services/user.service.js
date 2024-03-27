const userDao = require('../dao/user.dao');

const createUserService = async (userData) => {
  try {
    return await userDao.createUserDao(userData);
  } catch (error) {
    throw error;
  }
};

const fetchUsersService = async ({ skip, limit, sortBy, sortOrder, filter }) => {
  try {
    return await userDao.fetchUsersDao({ skip, limit, sortBy, sortOrder, filter });
  } catch (error) {
    throw error;
  }
};

const updateUserService = async (userId, userDetails) => {
  try {
    return await userDao.updateUsersDao(userId, userDetails)
  } catch (error) {
    throw error
  }
}

const deleteUserService = async (userId) => {
  try {
    return await userDao.deleteUsersDao(userId)
  } catch (error) {
    throw error
  }
}

module.exports = {
  createUserService,
  fetchUsersService,
  updateUserService,
  deleteUserService
};