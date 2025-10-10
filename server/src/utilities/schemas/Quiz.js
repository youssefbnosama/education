import mongoose from "mongoose";

const userQuizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    weekId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Week",
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    data: {
      type: Array,
      default: [],
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserQuiz", userQuizSchema);
