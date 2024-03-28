const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name is required
    description: { type: String }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Foreign key referencing User model
    createdAt: { type: Date, default: Date.now }
});

productSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Product = mongoose.model('Product', productSchema); // Change model name to "Product"

module.exports = Product;
