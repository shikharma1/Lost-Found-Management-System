const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, 'Please provide item name'],
      trim: true,
      maxlength: [100, 'Item name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    type: {
      type: String,
      enum: ['Lost', 'Found'],
      required: [true, 'Please specify if item is Lost or Found'],
    },
    location: {
      type: String,
      required: [true, 'Please provide location'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide date'],
    },
    category: {
      type: String,
      enum: ['Electronics', 'Documents', 'Accessories', 'Clothing', 'Books', 'Other'],
      required: [true, 'Please select a category'],
    },
    contactInfo: {
      type: String,
      required: [true, 'Please provide contact information'],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Open', 'Resolved'],
      default: 'Open',
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Item', itemSchema);
