import { BAD_REQUEST } from "../Constants/statusCodes.js";
import { Incident } from "../Models/Incident.Model.js";
import { User } from "../Models/User.model.js";
import { AddIncident, getAll_Tickets, getMyIncidentByStatus, getMyTickets, updateMyTicket, updateMyTicketStatus } from "../Services/incident.service.js";
import HttpError from "../Utils/httpError.js";

export const addTicket = async (req, res) =>{
   
  try{
        const ticket = await AddIncident(req);
        res.status(201).json({message:"Ticket created successfully ",ticket});

    } catch (error) {
        throw new HttpError(error.message,BAD_REQUEST)
    }
    
}

export const getTickets = async (req,res) =>{

    
    try {
       
        const tickets = await getMyTickets(req);
        res.status(200).json({tickets});

    } catch (error) {
        console.log("getTickets error", error);
        res.status(500).json({message:error.message});
    }
}


export const updateTicket = async (req, res) => {
    
    try{
        const ticket = await updateMyTicket(req);
        res.status(200).json({ message: "Ticket updated successfully", ticket });
    } catch (error) {
        console.error("assignTicket error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateTicketstatus = async (req,res) =>{

    try{
        const ticket = await updateMyTicketStatus(req);
        res.status(200).json({message:"Ticket status updated",ticket});
    } catch (error) {
        console.log("updateTicketstatus error",error);
        res.status(500).json({message:error.message});
    }
}

// export const sortByStatus = async (req,res) =>{

//     try {
//         const tickets = await Incident.find().sort({status:1});
//         res.status(200).json({tickets});
//     } catch (error) {
//         console.log("sortByStatus error",error);
//         res.status(500).json({message:error.message});
//     }
// }

//  export const sortByPriority = async (req,res) =>{}

export const getAllTickets = async (req,res) =>{
    try {
        const tickets = await getAll_Tickets();
        res.status(200).json({tickets});
    } catch (error) {
        console.log("getAllTickets error",error);
        res.status(500).json({message:error.message});
    }
}

export const ticketassignedtoTechnician = async (req,res) =>{
  
}

//wagwan bosy
export const getIncidentByStatus = async (req, res) => {
    try {
        await getMyIncidentByStatus()

        res.status(200).json({ statusCounts: formattedCounts });
    } catch (error) {
        console.error("getIncidentByStatus error", error);
        res.status(500).json({ message: error.message });
    }
};