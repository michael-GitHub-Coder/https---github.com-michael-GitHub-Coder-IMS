import { Region } from "../Models/region.model.js";
import {User} from "../Models/User.model.js";

export const addRegion = async (req, res) =>{  

    const {name} = req.body;

    try {
        
        if(!req.userId){
            return res.status(401).json({message:"Unauthorized"});
        }
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(401).json({message:"Unauthorized - No user found"});
        }
        if(!name){  
            return res.status(400).json({message:"All fields are required"});
        }

        if(user.role !== "Admin" ){
            return res.status(403).json({message:"Permission Denied"});
        }

        const region = new Region({
            name,
            managerId:req.userId
        });
        await region.save();

        res.status(201).json({message:"Region created successfully ",region});
    } catch (error) {
        console.log("addRegion error", error);
        res.status(500).json({message:error.message})
    }
    
}

export const getAllRegions = async (req,res) =>{

    try {

        if(!req.userId){
            return res.status(401).json({message:"Unauthorized"});
        }
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }

        if(user.role !== "Admin" ){
            return res.status(403).json({message:"Permission Denied"});
        }

        const regions = await Region.find().populate("managerId","name email");
        res.status(200).json({regions});
    } catch (error) {
        console.log("getAllRegions error", error);
        res.status(500).json({message:error.message});
    }
    
}