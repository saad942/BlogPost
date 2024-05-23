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


const deletePost = async (req, res) => {
  try {
      const id = req.params.id;
      const deletedProduct = await Post.findOneAndDelete({ _id: id });
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

module.exports = { Enregister, getEnrg,deletePost };

