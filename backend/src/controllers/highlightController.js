import Highlight from "../models/Highlight.js";

export const addHighlight = async (req, res) => {
  try {

    const {
      articleId,
      text,
      paragraph,
      startIndex,
      endIndex,
      color
    } = req.body;

    if(!articleId || paragraph == null)
      return res.status(400).json({message:"missing data"});

    const saved = await Highlight.create({
      userId: req.userId,
      articleId,
      text,
      paragraph,
      startIndex,
      endIndex,
      color
    });

    res.json(saved);

  } catch(err){
    res.status(500).json({error:err.message});
  }
};



export const getHighlights = async (req, res) => {
  const { articleId } = req.params;

  const list = await Highlight.find({
    userId: req.userId,
    articleId
  }).sort({ createdAt: -1 });

  res.json(list);
};


export const deleteHighlight = async (req, res) => {
  await Highlight.deleteOne({
    _id: req.params.id,
    userId: req.userId
  });

  res.json({ message: "Deleted" });
};
