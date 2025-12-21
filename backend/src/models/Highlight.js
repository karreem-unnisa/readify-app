import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },

  text: String,

  paragraph: Number,
  startIndex: Number,
  endIndex: Number,

  color: { type: String, default: "#ffff00" },

}, { timestamps:true });

export default mongoose.model("Highlight", highlightSchema);
