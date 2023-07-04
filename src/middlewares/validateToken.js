const { verifyToken } = require('../utils/token');

const validateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = {
   validateToken,
};