import mongoose from "mongoose";

const regionSchema = new mongoose.Schema({
  name: {
     type: String,
    required: true, 
    unique: true 
},
  managerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
});

export const Region = mongoose.model("Region", regionSchema);
