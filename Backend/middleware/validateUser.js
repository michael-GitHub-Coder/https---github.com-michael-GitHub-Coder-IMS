import {AddmemberSchema, loginSchema, signUpSchema} from "../Zschemas/userSchema.js";
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
import HttpError from "../Utils/httpError.js";

export const validateLogin = async (req,res,next) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        req.body = validatedData;
        next();
    } catch (error) {
        console.log(error.message);
        next( new HttpError(BAD_REQUEST,error.message));
    }
 }

export const validateSignUp = async (req,res,next) => {
    try {
        const validatedData = signUpSchema.parse(req.body);
        req.body = validatedData;
        next();
    } catch (error) {
        console.log(error.message);
        next(new HttpError(BAD_REQUEST,error.message));
    }
}

export const validateAddmember = async (req,res,next) => {
    console.log(req.body);
    try {
        const validatedData = AddmemberSchema.parse(req.body);
        req.body = validatedData;
        next();
    } catch (error) {
        console.log(error.message);
        next(new HttpError(BAD_REQUEST,error.message));
    }
}