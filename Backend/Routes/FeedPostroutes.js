const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth");
const {
  createFeedPost,
  getFeedPosts,
  getFeedPost,
  updateFeedPost,
  deleteFeedPost,
} = require("../Controllers/FeedPostcontroller");

router.get("/getfeedposts", getFeedPosts);
router.get("/:id", getFeedPost);
router.post("/creat", auth, createFeedPost);
router.put("/:id", auth, updateFeedPost);
router.delete("/:id", auth, deleteFeedPost);

module.exports = router;
