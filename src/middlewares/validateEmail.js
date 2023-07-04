module.exports = async (req, res, next) => {
  const schema = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { email } = req.body;

  if (!schema.test(email)) {
  return res.status(400).json({
    message: '"email" must be a valid email',
  });
  }

  next();
};