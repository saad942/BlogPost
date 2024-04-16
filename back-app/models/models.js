const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name is required
    description: { type: String }, 
    user_id: { type: Number }, // Reference to User model
    image: { type: String }, // Store path or URL to the image
    likes: {
        type: Number,
        default: 0
      },
    createdAt: { type: Date, default: Date.now }
});

productSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Product = mongoose.model('Product', productSchema); // Change model name to "Product"

module.exports = Product;
