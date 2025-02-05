import {Group} from '../Models/group.model.js';

export const addGroup = async (req, res) =>{
    
    const {name} = req.body;
    if(!name){
        return res.status(400).json({message:"All fields are required"});
    }

    try {
        const group = new Group({
            name
        });
        await group.save();
        res.status(201).json({message:"Group created successfully ",group});

    } catch (error) {
        console.log("addGroup error", error);
        res.status(500).json({message:error.message})
    }
}

export const addToGroup = async (req, res) =>{
    const {groupId, userId} = req.body;
    if(!groupId || !userId){
        return res.status(400).json({message:"All fields are required"});
    }
    try {
        const group = await Group.findById(groupId);
        if(!group){
            return res.status(404).json({message:"Group not found"});
        }
        group.members.push(userId);
        await group.save();
        res.status(200).json({message:"User added to group successfully",group});

    } catch (error) {
        console.log("addToGroup error", error);
        res.status(500).json({message:error.message})
    }
}