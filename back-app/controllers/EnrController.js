const Post = require('../models/EnrModels'); // Assuming you have a Post model

const Enregister = async (req, res) => {
  try {
    const { name, description, user_id, category } = req.body;

    const post = new Post({ name, description, user_id,  category });
    await post.save();

    res.json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





const getEnrg = async (req, res) => {
  const userId = req.params.userId;

  try {
    const postExists = await Post.find({ user_id: userId});

    
      res.json(postExists);
   
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { Enregister, getEnrg };

