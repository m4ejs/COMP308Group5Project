import mongoose from "mongoose";

const helpRequestSchema = new mongoose.Schema({
  title: String,
  description: String,
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "open" },
  matchedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("HelpRequest", helpRequestSchema);
