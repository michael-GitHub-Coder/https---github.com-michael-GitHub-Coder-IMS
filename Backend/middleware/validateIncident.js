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
import { incidentSchema } from "../Zschemas/incidentSchema.js";

export const validateincident = async (req,res,next) => {
    try {
        const validatedData = incidentSchema.parse(req.body);
        req.body = validatedData;
        next();
    } catch (error) {
        next(new HttpError(BAD_REQUEST,error.message));
    }
}