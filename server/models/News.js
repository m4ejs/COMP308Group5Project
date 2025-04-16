import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ['news', 'discussion'], default: 'news' }, // ✅ new
  },
  {
    timestamps: true // ✅ Automatically adds createdAt & updatedAt
  }
);

export default mongoose.model("News", newsSchema);
