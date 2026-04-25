const Joi = require('joi');

const registerSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required().pattern(/^[^\s@]+@kfupm\.edu\.sa$/, 'KFUPM Email'),
  studentId: Joi.string().pattern(/^\d{9}$/).optional(),
  password: Joi.string().min(8).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const updateUserSchema = Joi.object({
  fullName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().valid('student', 'moderator', 'admin').optional(),
  password: Joi.string().min(8).optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema
};
