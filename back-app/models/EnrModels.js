const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    post_id:{type: Number},
    user_id: { type: Number }, 
    createdAt: { type: Date, default: Date.now }
    } 
);

const Cart = mongoose.model('Enrg', cartSchema);

module.exports = Cart;
