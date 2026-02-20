const Challenge = require("../Models/Challenge");


const VALID_CATEGORIES = ["web", "network"];
const VALID_DIFFICULTIES = ["beginner", "intermediate", "advanced"];

const createChallenge = async (req, res) => {
  try {
    const { title, category, difficulty, codeOrConfig, solution, points } = req.body;

    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ message: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}` });
    }

    if (!VALID_DIFFICULTIES.includes(difficulty)) {
      return res.status(400).json({ message: `Invalid difficulty. Must be one of: ${VALID_DIFFICULTIES.join(", ")}` });
    }

    const challenge = await Challenge.create({
      title,
      category,
      difficulty,
      codeOrConfig,
      solution,
      points,
      author: req.user.id,
    });

    res.status(201).json({ message: "Challenge created", challenge });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getChallenges = async (req, res) => {
  try {
    const filters = {};
    if (req.query.category) filters.category = req.query.category;
    if (req.query.difficulty) filters.difficulty = req.query.difficulty;
    if (req.query.status) filters.status = req.query.status;

    const challenges = await Challenge.find(filters)
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id).populate(
      "author",
      "username"
    );

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.status(200).json(challenge);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

   
    if (challenge.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, category, difficulty, codeOrConfig, solution, points, status } = req.body;

      if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ message: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}` });
    }

    if (!VALID_DIFFICULTIES.includes(difficulty)) {
      return res.status(400).json({ message: `Invalid difficulty. Must be one of: ${VALID_DIFFICULTIES.join(", ")}` });
    }

    const updated = await Challenge.findByIdAndUpdate(
      req.params.id,
      { title, category, difficulty, codeOrConfig, solution, points, status },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Challenge updated", challenge: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

   
    if (challenge.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Challenge.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Challenge deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateChallengeStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "pending", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.status(200).json({ message: `Challenge ${status}`, challenge });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createChallenge,
  getChallenges,
  getChallenge,
  updateChallenge,
  deleteChallenge,
  updateChallengeStatus,
};
