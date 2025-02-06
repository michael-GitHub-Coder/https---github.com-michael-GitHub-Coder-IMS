import {Group} from '../Models/group.model.js';
import {User} from '../Models/User.model.js';
import {Region} from '../Models/region.model.js';

export const addGroup = async (req, res) =>{
    
    const {name,regionId,supervisorId} = req.body;
    if(!name){
        return res.status(400).json({message:"All fields are required"});
    }

    try {
        const group = new Group({
            name,
            regionId,
            supervisorId
        });
        await group.save();
        res.status(201).json({message:"Group created successfully ",group});

    } catch (error) {
        console.log("addGroup error", error);
        res.status(500).json({message:error.message})
    }
}

export const getAllGroups = async (req,res) =>{
    try {
        const groups = await Group.find();
        res.status(200).json({groups});
    } catch (error) {
        console.log("getAllGroups error", error);
        res.status(500).json({message:error.message});
    }
}


export const addToGroup = async (req, res) =>{
    
    const {regionId, supervisorId} = req.body;
    const {id} = req.params;

    

    if(!regionId || !supervisorId){
        return res.status(400).json({message:"All fields are required"});
    }

    try {
        
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        if(user.role !== "Admin"){
            return res.status(401).json({message:"You are not authorized to perform this action"});
        }

        const group = await Group.findById(id);
        if(!group){
            return res.status(404).json({message:"Group not found"});
        }
      
        const region = await Region.findById(regionId);
        if(!region){
            return res.status(404).json({message:"Region not found"});
        }
        
        const supervisor = await User.findById(supervisorId);
        if(!supervisor){
            return res.status(404).json({message:"Supervisor not found"});
        }

        group.name = group.name;
        group.regionId = regionId;
        group.supervisorId = supervisorId;

        await group.save();
        res.status(201).json({message:"Supervisor added to group:",groupName:group.name,group});

    } catch (error) {
        
        console.log("addToGroup error", error);
        res.status(500).json({message:error.message})
    }
   
}