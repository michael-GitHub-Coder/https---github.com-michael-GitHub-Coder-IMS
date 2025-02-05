import express  from "express";
import { login,addMembers, signup, logout, verifyEmail, forgotPassword, resetPassord,checkAuth,getAllUsers} from "../Controllers/auth.controller.js";
import { verifyToken } from "../middleware/veifyToken.js";
import { addTicket,updateTicket,updateTicketstatus,getAllTickets } from "../Controllers/incident.controller.js";
import {addRegion} from "../Controllers/region.controller.js";

const router = express.Router();

router.get("/check-auth", verifyToken,checkAuth);

router.post("/sign-up", signup);
router.post("/member",verifyToken, addMembers);
router.post("/login",login);

router.post("/logout",logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassord);

router.get("/All-Users",getAllUsers);
//tickets 
router.post("/Add-Ticket",verifyToken,addTicket);
router.get("/Ticket",verifyToken,addTicket); 
router.get("/Assign/:incidentID",verifyToken,updateTicket); 

router.put("/updateStatus/:id",verifyToken,updateTicketstatus); 

router.get("/All-Tickets",getAllTickets);

//Regions

router.post("/Add-Region",verifyToken,addRegion);


export default router;