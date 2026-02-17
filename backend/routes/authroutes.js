import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import dotenv from "dotenv";
import { login, signup } from "../controllers/authControllers.js";
import User from "../models/usermodel.js";
dotenv.config();


const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

router.get("/profile", verifyToken, async (req, res) => {
    res.set("Cache-Control", "no-store");
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
});


export default router;
