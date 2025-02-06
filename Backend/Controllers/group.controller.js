import {Group} from '../Models/group.model.js';

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
    if(!groupId || !supervisorId){
        return res.status(400).json({message:"All fields are required"});
    }

    try {
        
    } catch (error) {
        
    }
   
}