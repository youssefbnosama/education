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
      type: Array,
      default: [],
    },
    quizLength: {
      type: Number,
      required: function () {
        return this.type === "quiz";
      },
      default: 0,
    },
  },
  { timestamps: true }
);

export default contentSchema;
