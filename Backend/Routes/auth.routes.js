import express  from "express";
import { login, signup, logout, verifyEmail, forgotPassword, resetPassord,checkAuth} from "../Controllers/auth.controller.js";
import { verifyToken } from "../middleware/veifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken,checkAuth);

router.post("/sign-up", signup);
router.post("/login",login);

router.post("/logout",logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassord);

export default router;