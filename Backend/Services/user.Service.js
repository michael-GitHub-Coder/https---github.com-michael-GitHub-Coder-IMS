import { User } from "../Models/User.model.js";
import crypto from "crypto"
import bcryptjs from "bcryptjs"
import mongoose from "mongoose";
import HttpError from "../Utils/httpError.js";
import { AFTER_24_HOURS } from "../Utils/timeStamps.js";
import {
    OK,
    CREATED,
    ACCEPTED,
    NO_CONTENT,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    CONFLICT,
    INTERNAL_SERVER_ERROR} from "../Constants/statusCodes.js";



export const AddUser = async (req) => {
   
    try {
        const { firstName, lastName, email, role, phoneNumber, bio, country, postalCode, city, password } = req.body; 
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new HttpError("User already exists", CONFLICT);
        }

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new User({
            firstName,
            lastName,
            email,
            role,
            phoneNumber,
            bio,
            country,
            postalCode,
            city,
            password, 
            verificationToken,
            verificationTokenExpiresAt: AFTER_24_HOURS, 
        });

        await newUser.save();
        return newUser; 

    } catch (error) {
        throw new HttpError(error.message, BAD_REQUEST);
    }
};

export const validateEmail = async (code) => {

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        });
    
        if(!user){
            throw new HttpError("Invalid or expired verification code", BAD_REQUEST);
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
    
        await user.save();
    
        await sendWelcomeEmail(user.email, user.name);
        return user;

    } catch (error) {
        throw new HttpError(error.message, BAD_REQUEST);
    }

}

// Mathata fela


export const forgotMyPassword = async (email) => {

    try {
        const user = await User.findOne({email});
        
        if(!user){
            throw new HttpError("User not found", NOT_FOUND);
        }
        
        const resetToken  = crypto.randomBytes(20).toString("hex");
        const restTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
        
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = restTokenExpiresAt;
        
        await user.save();
       // await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        
        return user;
        
    } catch (error) {
        throw new HttpError(error.message, BAD_REQUEST);
    }
}

export const resetMypassword = async (token, password) => {

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()},
        });

        if(!user){
            throw new HttpError("Invalid or expired rest token", BAD_REQUEST); 
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt=undefined;

        await user.save();
    
        
       sendResetSuccessEmail(user.email);
        
    } catch (error) {
        throw new HttpError(error.message, BAD_REQUEST); 
    }
}

export const checkUser = async (req) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        .populate("group","name");
        if(!user){
            throw new HttpError("User not found", NOT_FOUND);
        }
        return user;
    } catch (error) {
        throw new HttpError(error.message, BAD_REQUEST);
    }
}

export const AddMyMember = async (req) => {

    const {firstName,lastName,email,role,phoneNumber,bio,country,postalCode,password,city,group} = req.body;
    
        try {
    
            const admin = await User.findById(req.userId).select("-password");
    
            if(!admin){
                throw new HttpError("Permission Denied", FORBIDDEN);
            } 
            if(admin.role !== "Admin"){
                throw new HttpError("Permission Denied", FORBIDDEN);
            }
    
            const user = await User.findOne({email});
            if(user){
                throw new HttpError("User already exists", CONFLICT);
            }

            const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    
            const newUser = new User({
                firstName,lastName,email,role,phoneNumber,bio,country,postalCode,city,group,
                password,
                verificationToken,
                verificationTokenExpiresAt: AFTER_24_HOURS
            });
            await newUser.save();

            return newUser;

        }catch (error) {
            throw new HttpError(error.message, BAD_REQUEST);
        }
}


export const updatedUser = async (req) => {

    const { firstName, lastName, email, role, phoneNumber, bio, country, postalCode, city } = req.body;
    const { _id } = req.params;

    try {
       
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            throw new HttpError("Invalid user ID", BAD_REQUEST);
        }
        const user = await User.findById(_id);
        if (!user) {
            throw new HttpError("User not found", NOT_FOUND);
        }

        user.firstName = firstName?.trim() || user.firstName;
        user.lastName = lastName?.trim() || user.lastName;
        user.email = email?.trim() || user.email;
        user.role = role || user.role;
        user.phoneNumber = phoneNumber?.trim() || user.phoneNumber;
        user.bio = bio?.trim() || user.bio;
        user.country = country?.trim() || user.country;
        user.city = city?.trim() || user.city;
        user.postalCode = postalCode?.trim() || user.postalCode;

        await user.save();
        return user;

    } catch (error) {
        throw new HttpError(error.message, BAD_REQUEST);
    }
}
