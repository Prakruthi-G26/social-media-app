import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
//console.log("JWT Secret 2:", process.env.JWT_SECRET);

const verifyToken = (req, res, next) => {
    try {
        //console.log(req.header("Authorization"))
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied" });
    }

    const token = authHeader.split(" ")[1];

    
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid token" });
    }
};


export default verifyToken;
