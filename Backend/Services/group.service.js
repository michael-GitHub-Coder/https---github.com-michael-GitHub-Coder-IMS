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
import { Group } from "../Models/group.model.js";
import { Region } from "../Models/region.model.js";
import { User } from "../Models/User.model.js";
import HttpError from "../Utils/httpError.js";

export const AddMygroup = async (req) => {

    const {name,regionId,supervisorId} = req.body;
    // if(!regionId || !supervisorId){
    //     return res.status(400).json({message:"All fields are required"});
    // }
    // if(!name){
    //     return res.status(400).json({message:"All fields are required"});
    // }
    
    try {
        const group = new Group({
            name,
            regionId,
            supervisorId,
            createdBy:req.userId,
        });                 
        await group.save();
        return group;
    } catch (error) {
        throw new HttpError(error.message, BAD_REQUEST);
    }
}


export const addToMygroup = async (req) =>{

    const {regionId, supervisorId} = req.body;
    const {id} = req.params;

          
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            throw new HttpError("User not found",NOT_FOUND)
        }
        if(user.role !== "Admin"){
            throw new HttpError("You are not authorized to perform this action",UNAUTHORIZED);
        }

        const group = await Group.findById(id);
        if(!group){
            throw new HttpError("Group not found",NOT_FOUND)
        }
    
        const region = await Region.findById(regionId);
        if(!region){
            throw new HttpError("Region not found",NOT_FOUND);
        }

        const supervisor = await User.findById(supervisorId);
        if(!supervisor){
            throw new HttpError("Supervisor not found",NOT_FOUND);
        }

        group.name = req.body.name;
        group.regionId = regionId;
        group.supervisorId = supervisorId;

        return await group.save();
        
    } catch (error) {
        throw new HttpError(error.message,BAD_REQUEST)
    }
    
}

export const getMyGroups = async () =>{

    try {

        const group = await Group.find().populate("createdBy","firstName lastName email")
        .populate("supervisorId","firstName lastName email")
        .populate("regionId","name");

        if(!group){
            throw new HttpError("group not found",NOT_FOUND);
        }
        
        return group;

    } catch (error) {
        throw new HttpError(error.message,BAD_REQUEST);
    }
}