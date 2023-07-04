const { createUserSchema } = require('./schemas');

const validateNewUser = ({ displayName, email, password, image = '' }) => {
  const { error } = createUserSchema.validate({ displayName, email, password, image });
  if (error) return { message: error.message };

  return { message: null };
};

module.exports = {
  validateNewUser,
};