// app.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors=require('cors');

const app = express();
const PORT = process.env.PORT || 3002;
const MONGODB_URI = "mongodb://localhost:27017/post";

// Middleware
app.use(express.json());
app.use(cors());
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
app.use('/user', require('./routes/postRoutes'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
