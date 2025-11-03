import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./Config/db.js";
import router from "./Routes/contactRoute.js";

const app = express();

// load env variable
dotenv.config();

// frontend to communicate

app.use(
  cors({
    origin: ["http://localhost:5173", "https://urvashidabgotra.vercel.app"],
    credentials: true,
  })
);

// port
const port = process.env.PORT || 8080;

app.use(express.json()); // parse json data

// database connection
connectDB();

// api for contact

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// initialize server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
