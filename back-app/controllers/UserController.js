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
        res.json({ token, userInfo: { _id: user.user_id } });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

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

module.exports = { Login, verifyToken, CreateUser };
