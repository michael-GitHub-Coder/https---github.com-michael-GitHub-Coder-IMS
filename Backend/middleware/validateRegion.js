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
import { regionSchema } from "../Zschemas/regionSchema.js";

export const validateRegion = async (req,res,next) => {
    try {
        const validatedData = regionSchema.parse(req.body);
        req.body = validatedData;
        next();
    } catch (error) {
        console.log(error.message);
        next(new HttpError(BAD_REQUEST,error.message));
    }
}