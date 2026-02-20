const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth");
const {
  createFeedComment,
  getFeedComments,
  updateFeedComment,
  deleteFeedComment,
  
} = require("../Controllers/Feedcommentscontroller");

router.get("/post/:postId", getFeedComments);
router.post("/post/:postId", auth, createFeedComment);
router.put("/:id", auth, updateFeedComment);
router.delete("/:id", auth, deleteFeedComment);

module.exports = router;
