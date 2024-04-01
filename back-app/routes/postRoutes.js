const express = require('express');
const router = express.Router();
const { 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  searchForProduct, 
  getProduct 
} = require("../controllers/postController");

const { verifyToken, Login, CreateUser } = require('../controllers/UserController');
// const dataUser = require("../dataUser.json");

// // Login route
// router.post('/login', (req, res) => {
//     const { name, password } = req.body;
    
//     // Find user in database
//     const user = dataUser.find(u => u.name === name && u.password === password);
    
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//     }
    
//     // Generate JWT token
//     const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
//     // Send token as response
//     res.json({ token });
// });

// Token verification middleware
// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.sendStatus(401); // Unauthorized
//     jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
//         if (err) return res.sendStatus(403); // Forbidden
//         req.user = data;
//         next();
//     });
// };
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });
router.get("/products", getProduct);
router.get("/products/:userId", verifyToken, getProductById);
router.post("/products", verifyToken, upload.single('image'),createProduct);
router.put("/products/:id", verifyToken, updateProduct);
router.delete("/products/:id", verifyToken, deleteProduct);
router.get("/products/search", verifyToken, searchForProduct); // Example of a search route

// User Routes
router.post("/register", CreateUser);
router.post("/login", Login);

module.exports = router;