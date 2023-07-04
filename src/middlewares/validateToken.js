const { tokenVerification } = require('../utils/token');

module.exports = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = tokenVerification(token);

    req.user = decoded.email;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  return next();
};
