const Joi = require('joi');

const CATEGORIES = [
  'Lecture Notes',
  'Past Exams',
  'Lab Materials',
  'Project Templates',
  'Study Guides',
  'Reference Materials',
  'Video Tutorials',
  'Other',
];

const createResourceSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  courseName: Joi.string().required(),
  category: Joi.string().valid(...CATEGORIES).required(),
  type: Joi.string().valid('file', 'link').required(),
  fileUrl: Joi.string().optional(),
  resourceUrl: Joi.string().optional()
});

const updateResourceSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  courseName: Joi.string().optional(),
  category: Joi.string().valid(...CATEGORIES).optional(),
  type: Joi.string().valid('file', 'link').optional(),
  fileUrl: Joi.string().optional(),
  resourceUrl: Joi.string().optional()
});

const updateResourceStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'approved', 'rejected').required(),
  rejectionReason: Joi.string().when('status', {
    is: 'rejected',
    then: Joi.required(),
    otherwise: Joi.optional()
  })
});

module.exports = {
  createResourceSchema,
  updateResourceSchema,
  updateResourceStatusSchema
};
