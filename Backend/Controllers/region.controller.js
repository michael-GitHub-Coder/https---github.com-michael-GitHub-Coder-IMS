import { Region } from "../Models/region.model.js";


export const addRegion = async (req, res) =>{  

    const {name} = req.body;
    
    if(!req.userId){
        return res.status(401).json({message:"Unauthorized 22"});
    }

    if(!name){  
        return res.status(400).json({message:"All fields are required"});
    }

    if(req.role !== "Admin" ){
        return res.status(403).json({message:"Permission Denied"});
    }

    try {
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