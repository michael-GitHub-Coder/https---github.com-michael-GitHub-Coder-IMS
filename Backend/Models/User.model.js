import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userschema = new mongoose.Schema({

    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:false
    },
    bio:{
        type:String,
        required:false
    },
    country:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:false
    },
    postalCode:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default:"Admin",
        enum: ["Admin", "Supervisor", "Technician"],
        required:true
    },
    group: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Group", 
        required: false 
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,

}, {Timestamps:true});

userschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });

export const User = mongoose.model("User",userschema);

