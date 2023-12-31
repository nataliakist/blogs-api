const { User } = require('../models');
const schema = require('./validations/validateInputValues');
const { tokenGenerator } = require('../utils/token');

const getAll = () => User.findAll({ attributes: { exclude: 'password' } });

const getByEmail = (email) => User.findOne({ where: { email } });

const getByUserId = (userId) => User.findByPk(userId, { attributes: { exclude: 'password' } });

const createUser = async ({ displayName, email, password, image }) => {
  const error = schema.validateNewUser({ displayName, email, password, image });
  if (error.message) return error;

  const userExists = await getByEmail(email);

  if (userExists) return { message: 'User already registered' };

  await User.create({ displayName, email, password, image });

  const token = await tokenGenerator({ email });

  return { token };
};

const deleteById = async (id) => {
  console.log(id);
  await User.destroy(
    { where: { id } },
  );
};

module.exports = {
  createUser,
  getAll,
  getByEmail,
  getByUserId,
  deleteById,
};