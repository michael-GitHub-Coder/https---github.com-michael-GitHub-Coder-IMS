import { Incident } from "../Models/Incident.Model.js";
import { User } from "../Models/User.model.js";

export const addTicket = async (req, res) =>{
   
    const {title,description,priority,status,region,group} = req.body;
    if(!title || !description || !priority || !status){
        return res.status(400).json({message:"All fields are required"});
    }

    try {

        const user = await User.findById(req.userId);

        if(user.role === "Technician" || user.role === "Supervisor"){
            return res.status(403).json({message:"Permission Denied"});
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
        await ticket.save();
        res.status(201).json({message:"Ticket created successfully ",ticket});

    } catch (error) {
        console.log("addTicket error", error);
        res.status(500).json({message:error.message})
    }
    
}

export const getTickets = async (req,res) =>{

    
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

        res.status(200).json({tickets});

    } catch (error) {
        console.log("getTickets error", error);
        res.status(500).json({message:error.message});
    }
}


export const updateTicket = async (req, res) => {
    const { ticketId } = req.params;
    const { assignedTo, status } = req.body;

    if (!assignedTo) {
        return res.status(400).json({ message: "Assigned user is required" });
    }

    try {
        // Ensure role and userId are available (assuming authentication middleware sets them)
        //console.log(req.role, req.userId);
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Restrict Technicians from assigning tickets
        // if (req.role === "Technician") {
        //     return res.status(403).json({ message: "Permission Denied" });
        // }

        const ticket = await Incident.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        // Assign the ticket
        ticket.assignedTo = assignedTo;
        ticket.status = status;
        ticket.supervisorId = req.userId;
        ticket.closedAt = new Date();

        await ticket.save();

        res.status(200).json({ message: "Ticket updated successfully", ticket });
    } catch (error) {
        console.error("assignTicket error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateTicketstatus = async (req,res) =>{

    const {id} = req.params;
    const {status} = req.body;

    if(!status || !id){
        return res.status(400).json({message:"All fields are required"});
    }

    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(400).json({message:"Permission Denied"});
        }
        const ticket = await Incident.findById(id);
        if(!ticket){
            return res.status(404).json({message:"Ticket not found"});
        }

        ticket.status = status;
        // if(user.role === "Technician"){
        //     ticket.assignedTo = req.userId;
        // }
        await ticket.save();
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
        const tickets = await Incident.find().populate("createdBy","firstName lastName email")
        .populate("assignedTo","firstName lastName email")
        .populate("supervisorId","firstName lastName email")
        .populate("region","name")
        .populate("group","name");
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
        const statusCounts = await Incident.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const formattedCounts = {};
        statusCounts.forEach(({ _id, count }) => {
            formattedCounts[_id] = count;
        });

        res.status(200).json({ statusCounts: formattedCounts });
    } catch (error) {
        console.error("getIncidentByStatus error", error);
        res.status(500).json({ message: error.message });
    }
};