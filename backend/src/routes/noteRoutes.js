import express from "express";
import auth from "../middlewares/authMiddleware.js";
import {
  addNote,
  getNotes,
  deleteNote
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/", auth, addNote);
router.get("/:articleId", auth, getNotes);
router.delete("/:id", auth, deleteNote);

export default router;
