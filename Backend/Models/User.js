
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
{
  username: String,
  email: String,
  password: String,
  reputation: { type: Number, default: 0 },
  role: { type: String, enum: ["user", "admin"], default: "user" },
//   solvedChallenges: [ObjectId]
});

const User = mongoose.model("User", userSchema);
module.exports = User;