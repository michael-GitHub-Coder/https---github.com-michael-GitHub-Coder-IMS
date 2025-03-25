import { User } from "../Models/User.model.js";
import HttpError from "../Utils/httpError.js";
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
import { Region } from "../Models/region.model.js";

export const addMyRegion = async (req)=>{
    const {name} = req.body;
    
    try {
            
        if(!req.userId){
            throw new HttpError("Unauthorized",UNAUTHORIZED)
        }
        const user = await User.findById(req.userId);
        if(!user){
            throw new HttpError("Unauthorized - No user found",UNAUTHORIZED)
        }
        // if(!name){  
        //     throw new HttpError()
        //     return res.status(400).json({message:"All fields are required"});
        // }
    
        if(user.role !== "Admin" ){
            throw new HttpError("Permission Denied",FORBIDDEN)
        }
    
        const region = new Region({
            name,
            managerId:req.userId
        });
        return await region.save();
    }catch (error){
        throw new HttpError(error.message,BAD_REQUEST)
    }
}

export const getAllMyRegions = async (req) =>{

    try {
        
        if(!req.userId){
            return res.status(401).json({message:"Unauthorized"});
        }
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }


   
        if(user.role !== "Admin"  ){
            return res.status(403).json({message:"Permission Denied"});
        }

        const regions = await Region.find().populate("managerId","name email");
        return regions;

    } catch (error) {
        throw new HttpError(error.message,BAD_REQUEST)
    }
}