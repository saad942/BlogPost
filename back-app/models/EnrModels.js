const mongoose = require('mongoose');

// Define the Cart schema
const cartSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name is required
    description: { type: String , required: true}, 
    user_id: { type: Number , required: true}, // Reference to User model using ObjectId
    category: { type: String , required: true},
});

// Create the Cart model from the schema
const Cart = mongoose.model('enrg', cartSchema);

module.exports = Cart;
