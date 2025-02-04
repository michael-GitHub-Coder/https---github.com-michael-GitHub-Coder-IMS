import express  from "express";
import { login, signup, logout, verifyEmail, forgotPassword, resetPassord,checkAuth} from "../Controllers/auth.controller.js";
import { verifyToken } from "../middleware/veifyToken.js";
import { addTicket } from "../Controllers/incident.controller.js";


const router = express.Router();

router.get("/check-auth", verifyToken,checkAuth);

router.post("/sign-up", signup);
router.post("/login",login);

router.post("/logout",logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassord);

//tickets 
router.post("/Add-Ticket",verifyToken,addTicket);
router.get("/Ticket",verifyToken,addTicket);

export default router;