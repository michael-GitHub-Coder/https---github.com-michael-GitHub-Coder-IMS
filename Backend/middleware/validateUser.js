import {loginSchema, signUpSchema} from "../Zschemas/userSchema.js";
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

export const validateLogin = async (req,res,next) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        req.body = validatedData;
        next();
    } catch (error) {
        return res.status(BAD_REQUEST).json({success:false,message:error.errors});
    }
 }

export const validateSignUp = async (req,res,next) => {
    try {
        const validatedData = signUpSchema.parse(req.body);
        req.body = validatedData;
        next();
    } catch (error) {
        return res.status(BAD_REQUEST).json({success:false,message:error.errors});
    }
}