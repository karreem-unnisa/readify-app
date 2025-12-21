import express from "express";
import auth from "../middlewares/authMiddleware.js";
import { updateScroll } from "../controllers/articleController.js";
import {
  addArticle,
  getArticles,
  getSingleArticle,
  deleteArticle,
} from "../controllers/articleController.js";

const router = express.Router();

router.post("/", auth, addArticle);
router.get("/", auth, getArticles);
router.get("/:id", auth, getSingleArticle);
router.delete("/:id", auth, deleteArticle);
router.patch("/:id/scroll", auth, updateScroll);

export default router;
