import express from "express";
import { contactUser } from "../Controllers/contactController.js";

const router = express.Router();

router.post("/contact", contactUser);

export default router;
