import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  validateCourseDescription,
  validateCourseGrade,
  validateCourseImage,
  validateCoursePrice,
  validateCourseTitle,
} from "./dashboardValidation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddCourse() {
  let errorState = {
    title: "",
    description: "",
    grade: "",
    price: "",
    image: "",
    fetch: "",
  };
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    grade: "",
    price: "",
    image: "",
  });
  const [errors, setErrors] = useState(errorState);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors(errorState);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let titleError = validateCourseTitle(form.title);
    let decriptionError = validateCourseDescription(form.description);
    let priceError = validateCoursePrice(form.price);
    let imageError = validateCourseImage(form.image);
    let gradeError = validateCourseGrade(form.grade);
    if (titleError) {
      setErrors({ ...errors, title: titleError });
      return;
    } else if (decriptionError) {
      setErrors({ ...errors, description: decriptionError });
      return;
    } else if (priceError) {
      setErrors({ ...errors, price: priceError });
      return;
    } else if (imageError) {
      setErrors({ ...errors, image: imageError });
      return;
    } else if (gradeError) {
      setErrors({ ...errors, grade: gradeError });
      console.log(gradeError)
      return;
    }
    let data = { ...form };
    console.log(data);
    let res = await fetch("http://localhost:5000/api/addcourse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    let result = await res.json();
    if (!res.ok) {
      setErrors({ ...errors, fetch: result.message });
      console.log(result.message);
      return;
    }
    navigate("/dashboard");
  };
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-6 flex justify-center items-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-card border border-border rounded-2xl shadow-lg w-full max-w-lg p-8"
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Add a New Course
        </h2>
        {errors.fetch && <p className="text-red-500 text-sm">{errors.fetch}</p>}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Course Title */}
          <div>
            <Label htmlFor="title" className="text-indigo-700 font-medium">
              Course Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter course title"
              className="mt-2"
              onChange={handleChange}
            />
          </div>
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}

          {/* Course Image */}
          <div>
            <Label htmlFor="image" className="text-indigo-700 font-medium">
              Course Image URL
            </Label>
            <Input
              id="image"
              type="text"
              placeholder="Paste course image link"
              className="mt-2"
              onChange={handleChange}
            />
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}

          {/* Course Description */}
          <div>
            <Label
              htmlFor="description"
              className="text-indigo-700 font-medium"
            >
              Course Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Write a short description"
              className="mt-2"
              onChange={handleChange}
            />
          </div>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}

          {/* Price */}
          <div>
            <Label htmlFor="price" className="text-indigo-700 font-medium">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter course price"
              className="mt-2"
              onChange={handleChange}
            />
          </div>
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}

          {/* Grade */}
          <div>
            <Label htmlFor="grade" className="text-indigo-700 font-medium">
              Grade
            </Label>
            <Select
              onValueChange={(value) => setForm({ ...form, grade: value })}
            >
              <SelectTrigger id="grade" className="mt-2">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sec-1">Sec-1</SelectItem>
                <SelectItem value="sec-2">Sec-2</SelectItem>
                <SelectItem value="sec-3">Sec-3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors.grade && (
            <p className="text-red-500 text-sm">{errors.grade}</p>
          )}

          {/* Submit Button */}
          <Button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
            Add Course
          </Button>
        </form>
      </motion.div>

      {/* Animated balls background */}
      <motion.div
        className="absolute top-20 left-10 w-28 h-28 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </section>
  );
}
