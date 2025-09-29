import mongoose from "mongoose";
import Content from "./Content.js";

const weekSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", 
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    contents: [Content], 
  },
  { timestamps: true }
);

export default mongoose.model("Week", weekSchema);
