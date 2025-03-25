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

export const getMyTickets = async (req) => {
    
    try {
        let tickets;
        if(req.role === "Admin"){
            tickets = await Incident.find()
            .populate("createdBy","firstName email")
            .populate("assignedTo","firstName email")
            .populate("supervisorId","firstName email")
            .populate("region","name")
            .populate("group","name");
        }else if(req.role === "Technician"){
            tickets = await Incident.find({assignedTo:req.userId})
            .populate("createdBy","name email")
            .populate("group","name");
        }
    } catch (error) {
        throw new HttpError(error.message,BAD_REQUEST)
    }
}


export const updateMyTicket = async (req) => {

    const { ticketId } = req.params;
    const { assignedTo, status } = req.body;
    
    // if (!assignedTo) {
    //     return res.status(400).json({ message: "Assigned user is required" });
    // }
    
    try {
        // Ensure role and userId are available (assuming authentication middleware sets them)
        //console.log(req.role, req.userId);
        if (!req.userId) {
            throw HttpError("Unauthorized",UNAUTHORIZED)
        }
    
        // Restrict Technicians from assigning tickets
        // if (req.role === "Technician") {
        //     return res.status(403).json({ message: "Permission Denied" });
        // }
    
        const ticket = await Incident.findById(ticketId);
        if (!ticket) {
            throw new HttpError("Ticket not found",NOT_FOUND)
        }
    
        // Assign the ticket
        ticket.assignedTo = assignedTo;
        ticket.status = status;
        ticket.supervisorId = req.userId;
        ticket.closedAt = new Date();
    
        return await ticket.save();
    }catch (error){
        throw new HttpError(error.message,BAD_REQUEST)
    }
}

export const updateMyTicketStatus = async (req) =>{
    const {id} = req.params;
    const {status} = req.body;

    // if(!status || !id){
    //     return res.status(400).json({message:"All fields are required"});
    // }

    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            throw new HttpError("Permission Denied",FORBIDDEN) 
        }
        const ticket = await Incident.findById(id);
        if(!ticket){
            throw new HttpError("Ticket not found",NOT_FOUND) 
        }

        ticket.status = status;
        // if(user.role === "Technician"){
        //     ticket.assignedTo = req.userId;
        // }
        return await ticket.save();
    }catch (error) {
        throw new HttpError(error.message,BAD_REQUEST)
    }
}

export const getAll_Tickets = async () =>{
  
    try {
        const tickets = await Incident.find().populate("createdBy","firstName lastName email")
        .populate("assignedTo","firstName lastName email")
        .populate("supervisorId","firstName lastName email")
        .populate("region","name")
        .populate("group","name");

        if(!tickets){
            throw new HttpError("Ticket Not Found",NOT_FOUND)
        }
        return tickets

    } catch (error) {
        throw new HttpError(error.message,BAD_REQUEST)
    }
}

export const getMyIncidentByStatus = async () =>{
    try {
        const statusCounts = await Incident.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const formattedCounts = {};
        statusCounts.forEach(({ _id, count }) => {
            formattedCounts[_id] = count;
        });
    } catch (error) {
        throw new HttpError(error.message,BAD_REQUEST)
    }
}