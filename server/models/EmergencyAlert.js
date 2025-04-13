import mongoose from "mongoose";

const emergencyAlertSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,  // e.g., city or area
  type: String,      // e.g., "Missing Pet", "Crime", "Fire"
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("EmergencyAlert", emergencyAlertSchema);
