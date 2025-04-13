import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  message: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  alertId: { type: mongoose.Schema.Types.ObjectId, ref: "EmergencyAlert" },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Notification", notificationSchema);
