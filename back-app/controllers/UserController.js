const User = require('../models/UserModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Login = async (req, res) => {
    const { name, password } = req.body;

    try {
        // Find user in database
        const user = await User.findOne({ name, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }


        // Generate JWT token
        const token = jwt.sign({ username: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userInfo: { id: user.user_id } });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUser =async(req,res)=>{
    const id =req.params.id
   try{
    const user =await User.findOneAndDelete({user_id:id})
    if (user) {
        res.send('Product deleted successfully');
    } else {
        res.status(404).send('Product not found');
    }
   }catch(error){
    console.error('Error deleting product:', error);
    res.status(500).send('Error deleting product');

   }
}

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401); // Unauthorized
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = data;
        next();
    });
};

const CreateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        // Hash the password before saving

        const user = new User({
            name,
            email,
            password// Store the hashed password
        });
        await user.save();
        res.status(201).json({ status: 'success', user });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getUserById = async (req, res) => {
    const userId = req.params.userId; 

    try {
        const user = await User.find({  user_id: userId }); 
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error); 
        res.status(500).json({ error: 'Internal server error' }); 
    }
};


module.exports = { Login, verifyToken, CreateUser ,getUserById ,deleteUser};
