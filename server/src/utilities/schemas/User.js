import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      trim: true,
      minlength: 3,
      maxlength: 15,
    },
    email: {
      type: String,
      required: [true, "Email address is required."],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: 6,
      select: false, // To prevent the password from being returned in queries
    },
    grade: {
      type:String,
    },
    courses:{
      type:Array,
      default:[],
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
