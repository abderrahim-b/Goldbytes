const FeedComment = require("../Models/FeedComment");
const FeedPost = require("../Models/FeedPost");

const createFeedComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const post = await FeedPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Feed post not found" });
    }

    const comment = await FeedComment.create({
      postId,
      content,
      author: req.user.id,
    });

    res.status(201).json({ message: "Comment created", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getFeedComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await FeedComment.find({ postId })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateFeedComment = async (req, res) => {
  try {
    const comment = await FeedComment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (
      comment.author.toString() !== req.user.id 
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { content } = req.body;
    if (content !== undefined) comment.content = content;

    await comment.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteFeedComment = async (req, res) => {
  try {
    const comment = await FeedComment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

   
    if (
      comment.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createFeedComment,
  getFeedComments,
  updateFeedComment,
  deleteFeedComment,
};
