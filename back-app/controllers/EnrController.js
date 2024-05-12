const Post = require('../models/EnrModels'); // Assuming you have a Post model

const Enregister = async (req, res) => {



  try {
    const { post_id, user_id } = req.body;
    const product = new Post({ post_id, user_id });
    await product.save();
    res.json(product);
} catch (err) {
    res.status(500).json({ error: err.message });
}
};



const getEnrg =async(req,res)=>{
  const userId = req.params.userId; // Extract the user ID from the JWT token
  try {
      const products = await Post.find({  user_id: userId  });
      res.json(products);
  } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {Enregister , getEnrg };
