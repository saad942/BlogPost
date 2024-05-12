const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    user_id: { type: Number }, 
    createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('enrg', cartSchema);

module.exports = Cart;
