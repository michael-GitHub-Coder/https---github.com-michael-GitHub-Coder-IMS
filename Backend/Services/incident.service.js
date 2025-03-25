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
import { User } from "../Models/User.model.js";

export const AddIncident = async (req) => {

      const {title,description,priority,status,region,group} = req.body;
    
        try {
    
            const user = await User.findById(req.userId);
    
            if(user.role === "Technician" || user.role === "Supervisor"){
                throw new HttpError("Permission Denied",FORBIDDEN)
            }
    
            const ticket = new Incident({
                title,
                description,
                priority,
                status,
                createdBy:req.userId,
                region,
                group
            });
            return await ticket.save();
        }catch (error){
            throw new HttpError(error.message, BAD_REQUEST);
        }

    
}
