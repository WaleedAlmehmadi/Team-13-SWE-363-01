const mongoose = require('mongoose');

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

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Resource title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    courseName: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: CATEGORIES,
    },
    // 'file' for uploaded documents, 'link' for external URLs
    type: {
      type: String,
      enum: ['file', 'link'],
      required: true,
    },
    fileUrl: {
      type: String, // path or cloud URL for uploaded file
    },
    resourceUrl: {
      type: String, // external link (YouTube, GitHub, Drive, etc.)
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // moderator who reviewed the resource
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    rejectionReason: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resource', resourceSchema);
