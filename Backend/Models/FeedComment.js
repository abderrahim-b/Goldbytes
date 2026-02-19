const mongoose = require("mongoose");
const feedcommentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "FeedPost" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FeedComment = mongoose.model("FeedComment", feedcommentSchema);
module.exports = FeedComment;