import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviews: [{
    text: String,
    sentiment: String,
    reply: String 
  }],
  deals: [{
    title: String,
    description: String,
    validUntil: String
  }]  
});


export default mongoose.model("Business", businessSchema);
