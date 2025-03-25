import { User } from "../Models/User.model.js";
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import {generateTokenAndsetCookie} from "../Utils/generateTokenAndsetCookie.js"
import {sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail, sendverificationEmail} from "../mailtrap/emails.js"
import mongoose from "mongoose";
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
import { AFTER_24_HOURS } from "../Utils/timeStamps.js";
import HttpError from "../Utils/httpError.js";
import { AddUser, checkUser, forgotMyPassword, resetMypassword, updatedUser } from "../Services/user.Service.js";

// export const signup = async (req,res,next) =>{

//     const {firstName,lastName,email,role,phoneNumber,bio,country,postalCode,password,city} = req.body;

//     if(!firstName || !lastName || !email || !role || !phoneNumber || !bio || !country || !postalCode || !password || !city){
//         return res.status(OK).json({message:"All fields are required"});
//     }

//     try {
//         const user = await User.findOne({email});
//         if(user){
//             return res.status(CONFLICT).json({message:"User already exists"});
//         }

//         //const salt = await bcryptjs.genSalt(10);
//         const hashedPassword = await bcryptjs.hash(password,10);
// 		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

//         const newUser = new User({
// 			firstName,lastName,email,role,phoneNumber,bio,country,postalCode,city,
// 			password:hashedPassword,
// 			verificationToken,
//             verificationTokenExpiresAt: AFTER_24_HOURS
// 		});
//         await newUser.save();

		
// 		generateTokenAndsetCookie(res,newUser._id);
//       // await sendverificationEmail(newUser.email, verificationToken);

//         res.status(CREATED).json({success:true, message:"User created successfully",User:newUser});

//     } catch (error) {
//         // console.log("Something went wrong", error.message);
//         // res.status(INTERNAL_SERVER_ERROR).json({message: "Something went wrong"});
        
//         throw new HttpError(error.message,BAD_REQUEST);
//     }

// };

export const signup = async (req, res, next) => {
    try {
        const user = await AddUser(req); 
        generateTokenAndsetCookie(res, user._id);
        return res.status(CREATED).json({
            success: true,
            message: "User created successfully",
            user,
        });
    } catch (error) {
        next(new HttpError(error.message, BAD_REQUEST)); 
        
    }
};


export const login = async (req, res) => {

	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(BAD_REQUEST).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(BAD_REQUEST).json({ success: false, message: "Invalid credentials" });
		}
	    // if(!user.isVerified){
		// 	return res.status(400).json({success:false, message:"Email not verified"});
		// }
        
		generateTokenAndsetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();
        
		res.status(OK).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
           
		});
	} catch (error) {
        throw new HttpError(error.message,BAD_REQUEST);
	}
};

export const verifyEmail = async (req,res) =>{

    const {code} = req.body;

    try {
        const user = await validateEmail(code);
        res.status(OK).json({
            success:true,
            message:"Email verified successfully",
            user : {
                ...user._doc,
                password: undefined,
            }
        }); 
    } catch (error) {
        // console.log("Verify email")
        // res.status(INTERNAL_SERVER_ERROR).json({success:false,message:"Server error"})
        throw new HttpError(error.message,INTERNAL_SERVER_ERROR);
    }
};

export const logout = async (req,res)=>{
    res.clearCookie("token");
    res.status(OK).json({success:true, message:"Logged Out successfully"});
};

export const forgotPassword = async (req,res) =>{

    const {email} = req.body;
    try {
        // const user = await User.findOne({email});

        // if(!user){
        //     return res.status(BAD_REQUEST).json({success:false,message:"User not found"})
        // }

        // const resetToken  = crypto.randomBytes(20).toString("hex");
        // const restTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        // user.resetPasswordToken = resetToken;
        // user.resetPasswordExpiresAt = restTokenExpiresAt;

        // await user.save();
        // await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        await forgotMyPassword(email);
        res.status(OK).json({success:true,message:"Password reset link sent to your email"});

    } catch (error) {
        console.log("Error in forgotPassword", error);
        res.status(BAD_REQUEST).json({success:false,message:error.message});
    }
};

export const resetPassord = async (req,res) => {

    try {
        const {token} = req.params;
        const {password} = req.body;

        await resetMypassword(token,password);
        res.status(OK).json({success:true,message:"Password reset successfull"});

    } catch (error) {
        console.log("Error in resetPassword", error);
        res.status(INTERNAL_SERVER_ERROR).json({success:false,message:error.message});
    }
};

export const checkAuth = async (req,res) =>{

    try {
        
        const user = await checkUser(req);
        res.status(OK).json({success:true, user});

    } catch (error) {
        res.status(BAD_REQUEST).json({success:false,message:error.message});
    }
};

export const addMembers = async (req,res) =>{
   
    try {

		const newUser = await AddUser(req);
		generateTokenAndsetCookie(res,newUser._id);
       // await sendverificationEmail(newUser.email, verificationToken);

        res.status(CREATED).json({success:true, message:"User created successfully",User:newUser});

    } catch (error) {
        console.log("Something went wrong", error.message);
        res.status(INTERNAL_SERVER_ERROR).json({message: "Something went wrong"});
    }

}

export const updateRole = async (req,res) =>{


}

export const getAllUsers = async (req,res) =>{

 
    try {
        // if(req.role !== "Admin"){
        //     throw new HttpError("Permission Denied",FORBIDDEN);
        // }
        const users = await User.find({}).select("-password");
        res.status(OK).json({success:true,users});
    } catch (error) {
        throw new HttpError(error.message,INTERNAL_SERVER_ERROR);
    }
}

export const updateUser = async (req, res) => {
    
    try {
        const user = await updatedUser(req);
        res.status(OK).json({ message: "Profile updated", user });
    } catch (error) {
        throw new HttpError(error.message,BAD_REQUEST);
    }
};
