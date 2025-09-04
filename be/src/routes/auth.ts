import { Router } from "express";
import { getProfile, loginUsers, registerUsers } from "../controllers/auth";
import { authenticate } from "../middleware/auth";

const authRoutes = Router();

authRoutes.post("/register", registerUsers);
authRoutes.post("/login", loginUsers);
authRoutes.get("/profile", authenticate, getProfile);

export default authRoutes;
