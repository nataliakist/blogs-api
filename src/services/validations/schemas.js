const Joi = require('joi');

const createUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

module.exports = {
  createUserSchema,
};