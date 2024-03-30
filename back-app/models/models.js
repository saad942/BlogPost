// ProductModels.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name is required
    description: { type: String }, 
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Foreign key referencing User model
    createdAt: { type: Date, default: Date.now }
});

// No need to apply plugin for auto-incrementing id in this schema

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
