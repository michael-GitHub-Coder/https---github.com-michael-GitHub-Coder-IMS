import { User } from "../Models/User.model.js";
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import {generateTokenAndsetCookie} from "../Utils/generateTokenAndsetCookie.js"
import {sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail, sendverificationEmail} from "../mailtrap/emails.js"


export const signup = async (req,res) =>{

    const {email,name,password} = req.body;

    if(!email || !name || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    try {
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        //const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new User({
			email,
			name,
			password:hashedPassword,
			verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
		});
        await newUser.save();

		
		generateTokenAndsetCookie(res,newUser._id);
       await sendverificationEmail(newUser.email, verificationToken);

        res.status(201).json({success:true, message:"User created successfully",User:newUser});

    } catch (error) {
        console.log("Something went wrong", error.message);
        res.status(500).json({message: "Something went wrong"});
    }

}

export const login = async (req, res) => {

	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
	    if(!user.isVerified){
			return res.status(400).json({success:false, message:"Email not verified"});
		}
		
		generateTokenAndsetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


export const verifyEmail = async (req,res) =>{

    const {code} = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        });

        if(!user){
            return res.status(400).json({success:false,message:"Invalid or expired verification code"});
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({
            success:true,
            message:"Email verified successfully",
            user : {
                ...user._doc,
                password: undefined,
            }
        });

    } catch (error) {
        console.log("Verify email")
        res.status(500).json({success:false,message:"Server error"})
    }
}


export const logout = async (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({success:true, message:"Logged Out successfully"});
}

export const forgotPassword = async (req,res) =>{

    const {email} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({success:false,message:"User not found"})
        }

        const resetToken  = crypto.randomBytes(20).toString("hex");
        const restTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = restTokenExpiresAt;

        await user.save();
        await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success:true,message:"Password reset link sent to your email"});

    } catch (error) {
        console.log("Error in forgotPassword", error);
        res.status(400).json({success:false,message:error.message});
    }
}

export const resetPassord = async (req,res) => {

    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()},
        });

        if(!user){
            return res.status(400).json({success:false,message:"Invalid or expired rest token"});
        }

        const hashedPassword = await bcryptjs.hash(password,10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt=undefined;

        await user.save();
    
        sendResetSuccessEmail(user.email);
        res.status(200).json({success:true,message:"Password reset successfull"});

    } catch (error) {
        console.log("Error in resetPassword", error);
        res.status(400).json({success:false,message:error.message});
    }
}

export const checkAuth = async (req,res) =>{

    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(400).json({success:false,message:"User not found"});
        }

        res.status(200).json({success:true, user});

    } catch (error) {
        console.log("Error in checkAuth", error);
        res.status(400).json({success:false,message:error.message});
    }
}