const FeedPost = require("../Models/FeedPost");

const createFeedPost = async (req, res) => {
  try {
    const { title, content, type } = req.body;

    const feedPost = await FeedPost.create({
      title,
      content,
      type,
      author: req.user.id,
    });

    res.status(201).json({ message: "Feed post created", feedPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getFeedPosts = async (req, res) => {
  try {
    const feedPosts = await FeedPost.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(feedPosts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getFeedPost = async (req, res) => {
  try {
    const feedPost = await FeedPost.findById(req.params.id).populate(
      "author",
      "username"
    );

    if (!feedPost) {
      return res.status(404).json({ message: "Feed post not found" });
    }

    res.status(200).json(feedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateFeedPost = async (req, res) => {
  try {
    const feedPost = await FeedPost.findById(req.params.id);

    if (!feedPost) {
      return res.status(404).json({ message: "Feed post not found" });
    }

    
    if (
      feedPost.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, content, type } = req.body;
    if (title !== undefined) feedPost.title = title;
    if (content !== undefined) feedPost.content = content;
    if (type !== undefined) feedPost.type = type;

    await feedPost.save();

    res.status(200).json({ message: "Feed post updated", feedPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteFeedPost = async (req, res) => {
  try {
    const feedPost = await FeedPost.findById(req.params.id);

    if (!feedPost) {
      return res.status(404).json({ message: "Feed post not found" });
    }

  
    if (
      feedPost.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await feedPost.deleteOne();

    res.status(200).json({ message: "Feed post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const likeFeedPost = async (req, res) => {
  try {
    const feedPost = await FeedPost.findById(req.params.id);
    if (!feedPost) {
      return res.status(404).json({ message: "Feed post not found" });
    }
    const userId = req.user.id;

    if (feedPost.author === userId) {
      return res.status(400).json({ message: "Cannot like your own post" });
    }
    if (feedPost.likes.includes(userId)) {
      feedPost.likes.pull(userId);
      await feedPost.save();
      return res.status(200).json({ message: "Post unliked" });
    }
    feedPost.likes.push(userId);
    await feedPost.save();
    res.status(200).json({ message: "Post liked" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createFeedPost,
  getFeedPosts,
  getFeedPost,
  updateFeedPost,
  deleteFeedPost,
  likeFeedPost
};
