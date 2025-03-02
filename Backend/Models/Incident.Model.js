import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  priority: { 
    type: String, 
    enum: ["Critical", "High", "Medium", "Low"], 
    required: true 
  },
  status: { type: String, 
    enum: ["Open", "In Progress", "Resolved", "Closed"], 
    default: "Open" 
  },
  loggedAt:{
    type:Date,
    default:Date.now
  },
  closedAt:{
    type:Date,
    default:null
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: false 
  },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: false 
  },
  supervisorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: false 
  },
  region: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Region", 
    required: false 
  },
  group: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Group", 
    required: false 
  },
}, { timestamps: true });

export const Incident = mongoose.model("Incident", incidentSchema);
