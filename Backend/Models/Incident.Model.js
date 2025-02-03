const mongoose = require("mongoose");

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
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  supervisorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  region: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Region", 
    required: true 
  },
  group: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Group", 
    required: true 
  },
}, { timestamps: true });

export const Incident = mongoose.model("Incident", incidentSchema);
