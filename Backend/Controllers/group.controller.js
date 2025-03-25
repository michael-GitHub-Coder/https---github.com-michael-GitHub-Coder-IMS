import {Group} from '../Models/group.model.js';
import {User} from '../Models/User.model.js';
import {Region} from '../Models/region.model.js';
import { AddMyMember } from '../Services/user.Service.js';
import HttpError from '../Utils/httpError.js';
import { BAD_REQUEST, CREATED, OK } from '../Constants/statusCodes.js';
import { addToMygroup, getMyGroups } from '../Services/group.service.js';


export const addGroup = async (req, res) =>{
    
    try {
        const group = await AddMyMember(req);
        res.status(CREATED).json({message:"Group created successfully ",group});
    } catch (error) {
        throw new HttpError(error.message, BAD_REQUEST)
    }
}

export const getAllGroups = async (req,res) =>{
    try {
        const groups = await Group.find();
        res.status(OK).json({groups});
    } catch (error) {
        throw new HttpError(error.message,BAD_REQUEST)
    }
}

export const addToGroup = async (req, res) =>{
    
  
    try {
        const group = await addToMygroup(req);
        res.status(201).json({message:"Supervisor added to group:",groupName:group.name,group});

    } catch (error) {
        
        console.log("addToGroup error", error);
        res.status(500).json({message:error.message})
    }
   
}


export const getGroups = async (req,res) =>{

    try {
        const group = await getMyGroups();
        res.status(200).json({group});

    } catch (error) {
        throw new HttpError(error.message,BAD_REQUEST);
    }
}
