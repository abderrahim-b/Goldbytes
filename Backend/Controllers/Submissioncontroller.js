const Submission = require("../Models/Submission");
const Challenge = require("../Models/Challenge");
const User = require("../Models/User");

const createSubmission = async (req, res) => {
  try {
    const { challengeId, answer } = req.body;

    if (!challengeId || !answer) {
      return res.status(400).json({ message: "challengeId and answer are required" });
    }

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    const existingApproved = await Submission.findOne({
      challengeId,
      userId: req.user.id,
      status: "approved",
    });
    if (existingApproved) {
      return res.status(400).json({ message: "You already have an approved submission for this challenge" });
    }

    const submission = await Submission.create({
      challengeId,
      userId: req.user.id,
      answer,
    });

    res.status(201).json({
      message: "Submission received, waiting for admin review.",
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const reviewSubmission = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be 'approved' or 'rejected'" });
    }

    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    if (submission.status !== "pending") {
      return res.status(400).json({ message: `Submission already ${submission.status}` });
    }

    submission.status = status;
    submission.reviewedBy = req.user.id;
    submission.reviewedAt = new Date();
    await submission.save();

    if (status === "approved") {
      await User.findByIdAndUpdate(submission.userId, {
        $addToSet: { solvedChallenges: submission.challengeId },
        $inc: { reputation: 10 },
      });
    }

    res.status(200).json({
      message: `Submission ${status}`,
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSubmissions = async (req, res) => {
  try {
    const filters = {};
    if (req.query.challengeId) filters.challengeId = req.query.challengeId;
    if (req.query.userId) filters.userId = req.query.userId;
    if (req.query.status) filters.status = req.query.status;

    const submissions = await Submission.find(filters)
      .populate("challengeId", "title category difficulty points")
      .populate("userId", "username")
      .sort({ submittedAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate("challengeId", "title category difficulty points")
      .populate("userId", "username");

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.id })
      .populate("challengeId", "title category difficulty points")
      .sort({ submittedAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getChallengeSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ challengeId: req.params.challengeId })
      .populate("userId", "username")
      .sort({ submittedAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    if (submission.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this submission" });
    }

    if (submission.status === "approved") {
      return res.status(400).json({ message: "Cannot delete an approved submission" });
    }

    await submission.deleteOne();
    res.status(200).json({ message: "Submission deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createSubmission,
  reviewSubmission,
  getSubmissions,
  getSubmission,
  getMySubmissions,
  getChallengeSubmissions,
  deleteSubmission,
};
