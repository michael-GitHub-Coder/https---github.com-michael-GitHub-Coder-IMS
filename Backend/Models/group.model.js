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
    required: false 
  },
  supervisorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: false 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: false 
  }
});

export const Group = mongoose.model("Group", groupSchema);
