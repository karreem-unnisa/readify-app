import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    title: String,
    author: String,
    mainImage: String,
    textContent: String,
    htmlContent: String,
    scrollPosition: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
