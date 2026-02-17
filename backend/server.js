import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/authroutes.js";
import postRouter from "./routes/postroutes.js";

//console.log("JWT Secret:", process.env.JWT_SECRET);
//config env file

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use((req, res, next)=>{
//   console.log("incoming",req.method,req.url);
// });
app.use("/", router);
app.use("/api/", postRouter);

//console.log("JWT Secret:", process.env.JWT_SECRET);

// Start server only after DB connects
const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

startServer();
