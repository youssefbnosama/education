import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["video", "pdf", "quiz"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: function () {
        return this.type !== "quiz";
      },
    },
    quiz: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default contentSchema;
