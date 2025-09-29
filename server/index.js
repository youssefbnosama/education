import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import mongoose from "mongoose";
import errorHandler from "./src/errorHandling/errorHandlerMiddleware.js";

import form from "./src/routes/form/form.js";
import profile from "./src/routes/profile/main.js";
import dashboard from "./src/routes/dashboard/main.js";
import courses from "./src/routes/courses/main.js";
import cart from "./src/routes/cart/main.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// MongoDB connection
const mongoURI = "mongodb://localhost:27017/teacher";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Routes
app.get("/", (req, res) => {
  res.sendStatus(200);
});
app.use(form);
app.use(profile);
app.use(dashboard);
app.use(courses);
app.use(cart);

app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
