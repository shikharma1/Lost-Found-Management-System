const Item = require('../models/Item');

// @route   POST /api/items
// @desc    Create a new item
// @access  Private
exports.createItem = async (req, res) => {
  try {
    const { itemName, description, type, location, date, category, contactInfo } = req.body;

    // Validation
    if (!itemName || !description || !type || !location || !date || !category || !contactInfo) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    if (!['Lost', 'Found'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Type must be either Lost or Found',
      });
    }

    // Create new item
    const item = await Item.create({
      itemName,
      description,
      type,
      location,
      date,
      category,
      contactInfo,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   GET /api/items
// @desc    Get all items
// @access  Public
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   GET /api/items/:id
// @desc    Get single item by ID
// @access  Public
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('user', 'name email');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   GET /api/items/search/query
// @desc    Search items by name or category
// @access  Public
exports.searchItems = async (req, res) => {
  try {
    const { name, category, type } = req.query;

    let searchQuery = {};

    if (name) {
      searchQuery.itemName = { $regex: name, $options: 'i' };
    }

    if (category) {
      searchQuery.category = category;
    }

    if (type && ['Lost', 'Found'].includes(type)) {
      searchQuery.type = type;
    }

    const items = await Item.find(searchQuery)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   PUT /api/items/:id
// @desc    Update item
// @access  Private
exports.updateItem = async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    // Check if user is the owner
    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this item',
      });
    }

    // Update fields
    const { itemName, description, type, location, date, category, contactInfo, status } = req.body;

    if (itemName) item.itemName = itemName;
    if (description) item.description = description;
    if (type) item.type = type;
    if (location) item.location = location;
    if (date) item.date = date;
    if (category) item.category = category;
    if (contactInfo) item.contactInfo = contactInfo;
    if (status) item.status = status;

    await item.save();

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   DELETE /api/items/:id
// @desc    Delete item
// @access  Private
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    // Check if user is the owner
    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this item',
      });
    }

    await Item.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   GET /api/items/user/my-items
// @desc    Get user's own items
// @access  Private
exports.getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
