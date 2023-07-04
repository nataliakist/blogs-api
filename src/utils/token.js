const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

const tokenGenerator = async (payload) => jwt.sign(payload, secret, jwtConfig);

const tokenVerification = (token) => jwt.verify(token, secret);

module.exports = {
  tokenGenerator,
  tokenVerification,
};