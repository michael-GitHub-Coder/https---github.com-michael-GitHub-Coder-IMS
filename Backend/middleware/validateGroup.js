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
import { groupSchema } from "../Zschemas/groupSchema.js";

export const validateGroup = async (req, res, next) => {
    try {
        const validatedData = groupSchema.parse(req.body);
        req.body = validatedData;
        next();
    } catch (error) {
        next(new HttpError(error.message, BAD_REQUEST));
    }
}