const { getByEmail } = require('../services/UserService');

module.exports = async (req, res, next) => {
  const { email } = req.body;

  const userExists = await getByEmail(email);

  if (userExists) {
    return res.status(409).json({
      message: 'User already registered',
    });
  }

  next();
};