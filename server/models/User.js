import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["resident", "business_owner", "community_organizer"] },
  location: String,         
  interests: [String]
});


export default mongoose.model("User", userSchema);
