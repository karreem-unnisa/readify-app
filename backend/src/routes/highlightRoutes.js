import express from "express";
import auth from "../middlewares/authMiddleware.js";
import {
  addHighlight,
  getHighlights,
  deleteHighlight
} from "../controllers/highlightController.js";

const router = express.Router();

router.post("/", auth, addHighlight);
router.get("/:articleId", auth, getHighlights);
router.delete("/:id", auth, deleteHighlight);


export default router;
