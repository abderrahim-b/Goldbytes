const mongoose = reqire("mongoose");
const challengeSchema = new mongoose.Schema({
   title: String,
  category: {type:String,enum:["web","network"]}, 
  difficulty: {type:String,enum:["beginner","intermediate","advanced"]}, 
  codeOrConfig: String,
  solution: String,
  points: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String,enum:["approved","pending","rejected"], default: "pending" }
});

const Challenge = mongoose.model("Challenge", challengeSchema);
module.exports = Challenge;