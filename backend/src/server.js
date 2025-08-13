import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import notesRoutes from "./routes/notesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors'

dotenv.config(); // Load .env variables

connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


// Routes
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
