import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
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
    highlightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Highlight"
    },
    text: {
      type: String,
      required: true,
    },
    position: String
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
