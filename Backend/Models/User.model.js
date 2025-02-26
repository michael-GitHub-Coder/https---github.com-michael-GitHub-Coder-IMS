import mongoose from "mongoose";

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


export const User = mongoose.model("User",userschema);

