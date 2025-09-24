"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "./validation/FormValidation";

export function Login() {
  const theErrorState = { email: "", password: "" };

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState(theErrorState);
  const handleChange = (e) => {
    setErrors(theErrorState);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    let emailError = validateEmail(form.email);
    let passwordError = validatePassword(form.password);
    if (emailError) {
      setErrors({ ...errors, email: emailError });
      return;
    } else if (passwordError) {
      setErrors({ ...errors, password: passwordError });
      return;
    }
    let data = { ...form };
    let res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials:"include"
    });
    let result = await res.json();
    if (!res.ok) {
      setErrors({ ...errors, fetch: result.message });
      return;
    }
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/10 p-4 relative overflow-hidden">
      {/* Animated background circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/10"
      />
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 20 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bottom-32 right-32 w-24 h-24 rounded-full bg-accent/15"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-secondary/20"
      />

      {/* Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <Card className="shadow-2xl border-2 backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-primary">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Log in to continue your journey 🔐
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.fetch && (
                <p className="text-red-500 text-sm">{errors.fetch}</p>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
              >
                Log In
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-primary font-medium hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
