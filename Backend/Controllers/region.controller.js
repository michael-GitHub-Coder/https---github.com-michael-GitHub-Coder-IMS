import { Region } from "../Models/region.model.js";
import {User} from "../Models/User.model.js";
import { addMyRegion, getAllMyRegions } from "../Services/region.service.js";

export const addRegion = async (req, res) =>{  

    try{
       const region = await addMyRegion(req);
        res.status(201).json({message:"Region created successfully ",region});
    } catch (error) {
        console.log("addRegion error", error);
        res.status(500).json({message:error.message})
    }
    
}

export const getAllRegions = async (req,res) =>{

    try{
        const regions = await getAllMyRegions(req);
        res.status(200).json({regions});

    } catch (error) {
        console.log("getAllRegions error", error);
        res.status(500).json({message:error.message});
    }

}