import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  regionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Region", 
    required: true 
  },
  supervisorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
});

export const Group = mongoose.model("Group", groupSchema);
