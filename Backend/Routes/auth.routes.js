import express  from "express";
import { login,addMembers, signup, logout, verifyEmail, forgotPassword, resetPassord,checkAuth,getAllUsers, updateUser} from "../Controllers/auth.controller.js";
import { verifyToken } from "../middleware/veifyToken.js";
import { addTicket,updateTicket,updateTicketstatus,getAllTickets ,getIncidentByStatus} from "../Controllers/incident.controller.js";
import {addRegion,getAllRegions} from "../Controllers/region.controller.js";
import {addGroup, getAllGroups,addToGroup} from "../Controllers/group.controller.js";

const router = express.Router();


//users


router.get("/check-auth", verifyToken,checkAuth);
router.post("/sign-up", signup);
router.post("/member",verifyToken, addMembers);
router.post("/login",login);
router.post("/logout",logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassord);
router.get("/All-Users",getAllUsers);

router.put("/Update-profile/:_id",verifyToken,updateUser);

//tickets 

router.post("/Add-Ticket",verifyToken,addTicket);
router.get("/Ticket",verifyToken,addTicket); 
router.get("/Assign/:incidentID",verifyToken,updateTicket); 
router.put("/updateStatus/:id",verifyToken,updateTicketstatus); 
router.get("/All-Tickets",verifyToken,getAllTickets);
router.put("/update-ticket/:ticketId",verifyToken,updateTicket);

router.get("/Count-status",verifyToken,getIncidentByStatus);

//Regions

router.post("/Add-Region",verifyToken,addRegion);
router.get("/All-Regions",verifyToken,getAllRegions);

//Groups

router.post("/Add-Group",verifyToken,addGroup);
router.get("/All-Groups",verifyToken,getAllGroups);
router.put("/Add-to-group/:id",verifyToken,addToGroup);


export default router;