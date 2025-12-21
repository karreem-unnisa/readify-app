import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
  });
})
.catch(err => console.log(err));
