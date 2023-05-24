const Comment = require("../models/comment");

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      "author",
      "username"
    );
    res.status(200).json(comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = new Comment({
      text,
      author: req.user.id,
      post: req.params.postId,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    if (comment.author.toString() !== req.user.id)
      return res.status(401).json({ error: "Unauthorized" });
    comment.text = text;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    if (comment.author.toString() !== req.user.id)
      return res.status(401).json({ error: "Unauthorized" });
    await comment.remove();
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};