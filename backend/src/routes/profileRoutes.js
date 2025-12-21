import express from "express";
import auth from "../middlewares/authMiddleware.js";
import Highlight from "../models/Highlight.js";
import Note from "../models/Note.js";
import Article from "../models/Article.js";

const router = express.Router();

router.get("/stats", auth, async (req,res) => {

  const highlightCount = await Highlight.countDocuments({ userId:req.userId });
  const noteCount      = await Note.countDocuments({ userId:req.userId });
  const articlesRead   = await Article.countDocuments({ userId:req.userId });

  res.json({ highlightCount, noteCount, articlesRead });
});

export default router;
