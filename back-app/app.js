// app.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/post";

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('uploads')); // Replace 'public' with the directory containing your images

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  });

// Routes
app.use('/user', require('./routes/postRoutes')); // Assuming these routes handle posts

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
