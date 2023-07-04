const UserService = require('../services/UserService');
const { tokenGenerator } = require('../utils/token');

const isBodyValid = (email, password) => email && password;

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isBodyValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await UserService.getByEmail(email);

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = tokenGenerator({ email });

    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  Login,
};