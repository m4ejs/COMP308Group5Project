import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  description: String,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

export default mongoose.model("Event", eventSchema);
