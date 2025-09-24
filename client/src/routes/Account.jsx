// src/pages/Account.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export function Account() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    grade: "",
  });
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((e) => e.json())
      .then((e) => setUser(e));
  }, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (field) => {
    alert(`Update ${field}: ${form[field]}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/10 p-6 overflow-hidden">
      {/* Animated background balls */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 20 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-24 left-32 w-32 h-32 rounded-full bg-primary/10 blur-xl"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 30 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bottom-24 right-20 w-40 h-40 rounded-full bg-accent/15 blur-2xl"
      />

      {/* Main card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl z-10"
      >
        <Card className="shadow-xl border backdrop-blur-sm bg-card/95 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Username */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="flex-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                />
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => handleUpdate("username")}
              >
                Update
              </Button>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="flex-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => handleUpdate("email")}
              >
                Update
              </Button>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-4"
            >
              <div className="flex-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => handleUpdate("password")}
              >
                Update
              </Button>
            </motion.div>

            {/* Grade */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4"
            >
              <div className="flex-1">
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  name="grade"
                  value={form.grade}
                  onChange={handleChange}
                  placeholder="Enter your grade"
                />
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => handleUpdate("grade")}
              >
                Update
              </Button>
            </motion.div>

            {/* Your courses button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="pt-6 text-center"
            >
              <span
                onClick={() => {
                  navigate("/courses");
                }}
              >
                <Button className=" mx-1 bg-accent hover:bg-accent/90 text-white px-6 py-3 text-lg font-semibold">
                  Your Courses
                </Button>
              </span>
              <span
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <Button
                  className=" mx-1 bg-accent hover:bg-accent/90 text-white px-6 py-3 text-lg font-semibold"
                >
                  Your Profile
                </Button>
              </span>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
