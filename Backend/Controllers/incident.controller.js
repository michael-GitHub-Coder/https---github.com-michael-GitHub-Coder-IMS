import { Incident } from "../Models/Incident.Model.js";

export const addTicket = async (req, res) =>{
   
    const {title,description,priority,status} = req.body;
    if(!title || !description || !priority || !status){
        return res.status(400).json({message:"All fields are required"});
    }

    try {

        if(req.role === "Technician" || req.role === "Supervisor"){
            return res.status(403).json({message:"Permission Denied"});
        }

        const ticket = new Incident({
            title,
            description,
            priority,
            status,
            createdBy:req.userId
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
            .populate("createdBy","name email")
            .populate("assignedTo","name email")
            .populate("supervisorId","name email")
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
//Information Technology Trainee Indsafri logo
//Indsafri

export const updateTicket = async (req,res) =>{

    const {incidentID} = req.prams;
    const {assignedTo} = req.body;
    if(!assignedTo){
        return res.status(400).json({message:"All fields are required"});
    }
    if(!incidentID){
        return res.status(400).json({message:"Incident ID is required"});
    }
    try {
        if(req.role === "Technician" ){
            return res.status(403).json({message:"Permission Denied"});
        }
        const ticket = await Incident.findById(incidentID);
        if(!ticket){
            return res.status(404).json({message:"Ticket not found"});
        }
        
        
        

    } catch (error) {
        console.log("assignticket error",error);
        res.status(500).json({message:error.message});
    }
}