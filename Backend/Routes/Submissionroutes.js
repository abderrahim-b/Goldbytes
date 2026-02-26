const express = require("express");
const router = express.Router();
const {
  createSubmission,
  reviewSubmission,
  getSubmissions,
  getSubmission,
  getMySubmissions,
  getChallengeSubmissions,
  deleteSubmission,
} = require("../Controllers/Submissioncontroller");
const { auth, adminOnly } = require("../Middleware/auth");

router.post("/", auth, createSubmission);
router.patch("/:id/review", auth, adminOnly, reviewSubmission);
router.get("/", auth, adminOnly, getSubmissions);
router.get("/my", auth, getMySubmissions);
router.get("/challenge/:challengeId", auth, getChallengeSubmissions);
router.get("/:id", auth, getSubmission);
router.delete("/:id", auth, deleteSubmission);

module.exports = router;
