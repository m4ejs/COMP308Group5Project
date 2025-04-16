import mongoose from "mongoose";

const emergencyAlertSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,  // e.g., city or area
  type: String,      // e.g., "Missing Pet", "Crime", "Fire"
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {
  timestamps: true // ✅ createdAt and updatedAt will be added automatically
});

export default mongoose.model("EmergencyAlert", emergencyAlertSchema);
