const UserService = require('../services/UserService');
const { tokenVerification } = require('../utils/token');

const validateUserFields = ({ displayName, email, password }) => {
  if (!displayName || !email || !password) {
    return ({ message: 'Verifique se todos os campos foram preenchidos da forma correta!' });
  }
};

const getUserId = async (token) => {
  const verifiedToken = tokenVerification(token);
  const userEmail = verifiedToken.email;
  const user = await UserService.getByEmail(userEmail);
  const userId = user.dataValues.id;

  return userId;
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

const getById = async (req, res) => {
  const { id } = req.params;
  
  const user = await UserService.getByUserId(id);

  if (!user) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(user);
};

const deleteByToken = async (req, res) => {
  const { authorization: token } = req.headers;

  const userId = await getUserId(token);

  console.log(userId);

  if (!userId) return res.status(404).json({ message: 'User does not exist' });

  await UserService.deleteById(userId);

  return res.status(204).json();
};

module.exports = {
  createUser,
  getAll,
  getById,
  deleteByToken,
};