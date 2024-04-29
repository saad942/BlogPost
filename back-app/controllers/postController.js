const Product = require('../models/models');
const fs = require('fs');
const products = require("../post.json");
const User = require('../models/UserModels')


function saveData() {
    const js_str = JSON.stringify(products, null, 2)
    fs.writeFileSync("./post.json", js_str)
}
const searchForProduct = async (req, res) => {
    try {
        const category = req.query.category;
        // Check if category parameter is missing or empty
        if (!category) {
            return res.status(400).send('Category parameter is missing');
        }
        // Query products based on the provided category
        const products = await Product.find({ category });
        // Check if any products are found
        if (products.length > 0) {
            res.send(products);
        } else {
            res.status(404).send('No products found within the specified category');
        }
    } catch (error) {
        console.error('Error searching for products:', error);
        res.status(500).send('Error searching for products');
    }
};



const getProductById = async (req, res) => {
    const userId = req.params.userId; // Extract the user ID from the JWT token

    try {
        const products = await Product.find({ user_id: userId });
        res.json(products);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const createProduct = async (req, res) => {
    try {
        const { name, description, user_id, category } = req.body;
        const image = req.file.filename;
        const product = new Product({ name, description, user_id, image, category });
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, image, category } = req.body;
        const updatedProduct = await Product.findOneAndUpdate({ id: id }, { $set: { name, description, image, category } }, { new: true });
        if (updatedProduct) {
            res.send(updatedProduct);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product');
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findOneAndDelete({ id: id });
        if (deletedProduct) {
            res.send('Product deleted successfully');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Error deleting product');
    }
};



const getProduct = async (req, res) => {
    const product = await Product.find()
    if (product) {
        res.send(product)
    } else {
        res.status(404).send('Product not found');

    }


};

module.exports = { getProductById, createProduct, updateProduct, deleteProduct, searchForProduct, getProduct };
