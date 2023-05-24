const Post = require("../models/post");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const post = new Post({ title, text, author: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.status(401).json({ error: "Unauthorized" });
    post.title = title;
    post.text = text;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.status(401).json({ error: "Unauthorized" });
    await post.remove();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};