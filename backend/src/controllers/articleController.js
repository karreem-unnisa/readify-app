import Article from "../models/Article.js";
import { parseArticleFromUrl } from "../services/articleParser.js";

export const addArticle = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) return res.status(400).json({ message: "URL required" });

    const parsed = await parseArticleFromUrl(url);

    const article = await Article.create({
      userId: req.userId,
      url,
      title: parsed.title,
      author: parsed.author,
      textContent: parsed.textContent,
      htmlContent: parsed.htmlContent,
    });

    res.status(201).json(article);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getArticles = async (req, res) => {
  const list = await Article.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(list);
};

export const getSingleArticle = async (req, res) => {
  const article = await Article.findOne({
    _id: req.params.id,
    userId: req.userId
  });

  if (!article) return res.status(404).json({ message: "Not found" });

  res.json(article);
};

export const deleteArticle = async (req, res) => {
  await Article.deleteOne({
    _id: req.params.id,
    userId: req.userId
  });

  res.json({ message: "Deleted" });
};

export const updateScroll = async (req, res) => {
  try {
    const { id } = req.params;
    const { scrollPosition } = req.body;

    await Article.updateOne(
      { _id: id, userId: req.userId },
      { scrollPosition }
    );

    res.json({ message: "scroll updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
