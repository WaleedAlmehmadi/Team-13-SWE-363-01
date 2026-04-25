const Resource = require('../models/Resource');

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
const getResources = async (req, res) => {
  try {
    const { category, courseName, status, search, type } = req.query;
    
    let query = {};
    
    // If not admin/moderator, only show approved resources by default
    if (status) {
        query.status = status;
    } else if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'moderator')) {
        query.status = 'approved';
    }

    if (category) query.category = category;
    if (type) query.type = type;
    if (courseName) query.courseName = { $regex: courseName, $options: 'i' };
    if (search) query.title = { $regex: search, $options: 'i' };

    const resources = await Resource.find(query)
      .populate('uploadedBy', 'fullName email')
      .sort('-createdAt');
      
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single resource
// @route   GET /api/resources/:id
// @access  Public
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('uploadedBy', 'fullName email')
      .populate('reviewedBy', 'fullName');

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a resource
// @route   POST /api/resources
// @access  Private
const createResource = async (req, res) => {
  try {
    const { title, description, courseName, category, type, fileUrl, resourceUrl } = req.body;

    const resource = new Resource({
      title,
      description,
      courseName,
      category,
      type,
      fileUrl,
      resourceUrl,
      uploadedBy: req.user._id,
      status: 'pending' // Default status
    });

    const createdResource = await resource.save();
    res.status(201).json(createdResource);
  } catch (error) {
    res.status(400).json({ message: 'Invalid resource data', error: error.message });
  }
};

// @desc    Update a resource
// @route   PUT /api/resources/:id
// @access  Private
const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Check ownership
    if (resource.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin' && req.user.role !== 'moderator') {
        return res.status(403).json({ message: 'Not authorized to update this resource' });
    }

    const { title, description, courseName, category, type, fileUrl, resourceUrl } = req.body;

    resource.title = title || resource.title;
    resource.description = description || resource.description;
    resource.courseName = courseName || resource.courseName;
    resource.category = category || resource.category;
    resource.type = type || resource.type;
    if (fileUrl) resource.fileUrl = fileUrl;
    if (resourceUrl) resource.resourceUrl = resourceUrl;
    
    // If a regular user updates it, reset status to pending to be reviewed again
    if (req.user.role === 'student') {
        resource.status = 'pending';
    }

    const updatedResource = await resource.save();
    res.json(updatedResource);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin' && req.user.role !== 'moderator') {
        return res.status(403).json({ message: 'Not authorized to delete this resource' });
    }

    await Resource.deleteOne({ _id: resource._id });
    res.json({ message: 'Resource removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update resource status
// @route   PATCH /api/resources/:id/status
// @access  Private/Moderator/Admin
const updateResourceStatus = async (req, res) => {
    try {
        const { status, rejectionReason } = req.body;
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        resource.status = status;
        resource.reviewedBy = req.user._id;
        
        if (status === 'rejected' && rejectionReason) {
            resource.rejectionReason = rejectionReason;
        }

        const updatedResource = await resource.save();
        res.json(updatedResource);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  updateResourceStatus
};
