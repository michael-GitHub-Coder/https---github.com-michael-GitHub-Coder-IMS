import { User } from "../Models/User.model.js";
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
            return res.status(CONFLICT).json({ message: "User already exists" });
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
            verificationTokenExpiresAt: Date.now() + AFTER_24_HOURS, 
        });

        await newUser.save();
        return newUser; 

    } catch (error) {
        throw new HttpError(error.message, INTERNAL_SERVER_ERROR);
    }
};

