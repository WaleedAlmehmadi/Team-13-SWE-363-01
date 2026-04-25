const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  updateResourceStatus
} = require('../controllers/resourceController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createResourceSchema, updateResourceSchema, updateResourceStatusSchema } = require('../validations/resourceValidation');

// Optional auth middleware for getting resources (to populate req.user if token is present)
const optionalAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
        } catch (e) {
            // ignore
        }
    }
    next();
};

router.route('/')
  .get(optionalAuth, getResources)
  .post(protect, validate(createResourceSchema), createResource);

router.route('/:id')
  .get(getResourceById)
  .put(protect, validate(updateResourceSchema), updateResource)
  .delete(protect, deleteResource);

router.route('/:id/status')
  .patch(protect, authorize('admin', 'moderator'), validate(updateResourceStatusSchema), updateResourceStatus);

module.exports = router;
