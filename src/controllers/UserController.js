const UserService = require('../services/UserService');

const validateUserFields = ({ displayName, email, password }) => {
  if (!displayName || !email || !password) {
    return ({ message: 'Verifique se todos os campos foram preenchidos da forma correta!' });
  }
};

const createUser = async (req, res) => {
  const data = req.body;

  const invalidFieldsError = validateUserFields(data);

  if (invalidFieldsError) return invalidFieldsError;

  const user = await UserService.createUser(data);

  if (user.message) return res.status(400).json(user);

  if (!user) throw Error;

  return res.status(201).json(user);
};

const getAll = async (req, res) => {
  const users = await UserService.getAll();
  return res.status(200).json(users);
};

module.exports = {
  createUser,
  getAll,
};