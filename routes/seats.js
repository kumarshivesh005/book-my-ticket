import express from "express";
import { bookSeat } from "../controller/seats.js";
import { authMiddleware } from "../middleware/auth.js";

const bookingRoutes = express.Router();

bookingRoutes.put("/book/:id", authMiddleware, bookSeat);

export default bookingRoutes;