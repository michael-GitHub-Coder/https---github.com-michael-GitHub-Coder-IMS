import express  from "express";
import { login,addMembers, signup, logout, verifyEmail, forgotPassword, resetPassord,checkAuth,getAllUsers, updateUser} from "../Controllers/auth.controller.js";
import { verifyToken } from "../middleware/veifyToken.js";
import { addTicket,updateTicket,updateTicketstatus,getAllTickets ,getIncidentByStatus} from "../Controllers/incident.controller.js";
import {addRegion,getAllRegions} from "../Controllers/region.controller.js";
import {addGroup, getAllGroups,addToGroup, getGroups} from "../Controllers/group.controller.js";
import { validateAddmember, validateLogin, validateSignUp } from "../middleware/validateUser.js";
import { validateincident } from "../middleware/validateIncident.js";
import { validateGroup } from "../middleware/validateGroup.js";
import { validateRegion } from "../middleware/validateRegion.js";

const router = express.Router();


//users


router.get("/check-auth", verifyToken,checkAuth);
router.post("/sign-up", validateSignUp,signup);
router.post("/member",validateAddmember,verifyToken, addMembers);
router.post("/login",validateLogin,login);
router.post("/logout",logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassord);
router.get("/All-Users",getAllUsers);

router.put("/Update-profile/:_id",verifyToken,updateUser);

//tickets 

router.post("/Add-Ticket",validateincident,verifyToken,addTicket);
router.get("/Ticket",verifyToken,addTicket); 
router.get("/Assign/:incidentID",verifyToken,updateTicket); 
router.put("/updateStatus/:id",verifyToken,updateTicketstatus); 
router.get("/All-Tickets",verifyToken,getAllTickets);
router.put("/update-ticket/:ticketId",verifyToken,updateTicket);

router.get("/Count-status",verifyToken,getIncidentByStatus);


router.get("/getTs",verifyToken,getAllTickets);
//Regions

router.post("/Add-Region",validateRegion, verifyToken,addRegion);
router.get("/All-Regions",verifyToken,getAllRegions);

//Groups

router.post("/Add-Group",validateGroup,verifyToken,addGroup);
router.get("/All-Groups",verifyToken,getAllGroups);
router.put("/Add-to-group/:id",verifyToken,addToGroup);
router.get("/getGroups",verifyToken,getGroups);


export default router;