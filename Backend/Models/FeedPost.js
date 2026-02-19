const mongoose = require("mongoose");

const feedPostSchema = new mongoose.Schema({
  title: String,
  content: String,

  type: {
    type: String,
    enum: ["discussion", "tip", "question"],
    default: "discussion",                   
  },

  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FeedPost = mongoose.model("FeedPost", feedPostSchema);
module.exports = FeedPost;
