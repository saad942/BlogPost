const Product = require('../models/models');
const fs=require('fs');
const products = require("../post.json");


function saveData(){
    const js_str = JSON.stringify(products, null , 2)
    fs.writeFileSync("./post.json", js_str)
}
const searchForProduct = async (req, res) => {
    try {
        const min = req.query.minPrice;
        const max = req.query.maxPrice;
        const products = await Product.find({ price: { $gte: min, $lte: max } });
        if (products.length > 0) {
            res.send(products);
        } else {
            res.status(404).send('No products found within the specified price range');
        }
    } catch (error) {
        console.error('Error searching for products:', error);
        res.status(500).send('Error searching for products');
    }
};


const getProductById = async (req, res) => {
    const userId = req.user.userId; // Extract the user ID from the JWT token

    try {
        const products = await Product.find({ user: userId });
        res.json(products);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const createProduct = async (req, res) => {
    try {
        const { name, description } = req.body; // Destructure "name" and "description" from request body

        // Validate if "name" is provided
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        // Create a new product
        const product = new Product({
            name: name,
            description: description
        });

        // Save the product to the database
        await product.save();

        res.status(201).json({ status: 'success', product: product });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name,  description } = req.body;
        const updatedProduct = await Product.findOneAndUpdate({id:id}, {$set:{ name,  description }}, { new: true });
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
        const deletedProduct = await Product.findOneAndDelete({id:id});
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

const getProduct=async(req,res)=>{
    const product= await Product.find()
    if(product){
       res.send(product) 
    }else{
        res.status(404).send('Product not found');

    }
    

};

module.exports = { getProductById, createProduct, updateProduct, deleteProduct,searchForProduct,getProduct };
