const jwt = require('jsonwebtoken');

const { getByUserId } = require('../services/userService');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

module.exports = async (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  const token = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(token, secret);
   
    const user = await getByUserId(decoded.data.userId);

    if (!user) {
      return res.status(401).json({ message: 'Invalid fields' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};