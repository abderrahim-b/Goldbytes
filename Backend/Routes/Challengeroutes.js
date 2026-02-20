const express = require("express");
const router = express.Router();
const {
  createChallenge,
  getChallenges,
  getChallenge,
  updateChallenge,
  deleteChallenge,
  updateChallengeStatus,
} = require("../Controllers/Chalengecontroller");
const { auth, adminOnly } = require("../Middleware/auth");

router.post("/", auth, createChallenge);
router.get("/", getChallenges);
router.get("/:id", getChallenge);
router.put("/:id", auth, updateChallenge);
router.delete("/:id", auth, deleteChallenge);
router.patch("/:id/status", auth, adminOnly, updateChallengeStatus);

module.exports = router;
