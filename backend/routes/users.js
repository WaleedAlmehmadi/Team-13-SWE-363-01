const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { updateUserSchema } = require('../validations/userValidation');

router.route('/')
  .get(protect, authorize('admin', 'moderator'), getUsers);

router.route('/:id')
  .get(protect, getUserById)
  .put(protect, validate(updateUserSchema), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

module.exports = router;
