import Note from "../models/Note.js";

export const addNote = async (req, res) => {
  try {
    const { articleId, text, highlightId, position } = req.body;

    const note = await Note.create({
      userId: req.userId,
      articleId,
      highlightId,
      text,
      position
    });

    res.status(201).json(note);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNotes = async (req, res) => {
  const { articleId } = req.params;

  const list = await Note.find({
    userId: req.userId,
    articleId
  }).sort({ createdAt: -1 });

  res.json(list);
};

export const deleteNote = async (req, res) => {
  await Note.deleteOne({
    _id: req.params.id,
    userId: req.userId
  });

  res.json({ message: "Deleted" });
};
