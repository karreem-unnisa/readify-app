import express from "express";
import { registerUser, loginUser, getMe, changePassword } from "../controllers/authController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);
router.post("/change-password", authMiddleware, changePassword);


export default router;
