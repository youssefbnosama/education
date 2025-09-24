import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      minlength: [3, "Course title must be at least 3 characters"],
      maxlength: [100, "Course title must be less than 100 characters"],
    },
    image: {
      type: String,
      required: [true, "Course image is required"],
      validate: {
        validator: function (value) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)$/.test(value);
        },
        message: "Please provide a valid image URL",
      },
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      minlength: [10, "Description should be at least 10 characters"],
      maxlength: [1000, "Description should not exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: [0, "Price cannot be negative"],
    },
    grade: {
      type: Number,
      required: [true, "Grade is required"],
      enum: ["Sec-1","Sec-2","Sec-3"], // حسب الفورم بتاعك
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
