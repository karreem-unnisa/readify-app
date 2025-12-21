import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import highlightRoutes from "./routes/highlightRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://readify-app.vercel.app"],
  credentials: true
}));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/articles", articleRoutes);
app.use("/highlights", highlightRoutes);
app.use("/notes", noteRoutes);
app.use("/profile", profileRoutes);
export default app;
