import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  summary: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("News", newsSchema);
