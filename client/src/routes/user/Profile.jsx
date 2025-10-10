// src/pages/Profile.jsx
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../user/Sidebar";
import { fetchFunction } from "@/utilities/fetchFunction";

export function Profile() {
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let loading = async () => {
      try {
        const { res: profileRes, result: profileResult } = await fetchFunction(
          "/api/profile",
          "GET",
          true
        );
        // if(profileResult.navigateToLogin) navigate("/login")
        profileRes.ok ? setUser(profileResult) : navigate("/login");
        const { res: coursesRes, result: coursesResult } = await fetchFunction(
          "/api/getcourses",
          "GET",
          true
        );
        if (coursesRes.ok) setCourses(coursesResult);
      } catch (err) {
        console.log(err);
      }
    };
    loading();
  }, []);
  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
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

      {<Sidebar />}
      {/* Main content */}
      <main className="flex-1 p-8 relative z-10">
        {/* User info */}
        <div className="mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Welcome, {user.username || "User"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg font-medium text-gray-700"
          >
            Grade: {user.grade || "N/A"}
          </motion.p>
        </div>

        {/* Courses */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Your Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses && courses.length > 0 ? (
              courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition bg-white/80 backdrop-blur">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-44 w-full object-cover"
                    />
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-indigo-700">
                        {course.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        {course.description}
                      </p>
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-3">
                        Grade: {course.grade}
                      </span>
                      <div>
                        <Button
                          onClick={() => {
                            navigate(`/courses/${course.grade}/${course._id}`);
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          Enter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-full flex flex-col items-center justify-center p-10 rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50 text-center"
              >
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                  No Courses Yet
                </h3>
                <p className="text-gray-600 mb-4">
                  You haven’t enrolled in any courses. Start exploring and
                  unlock your learning journey!
                </p>
                <Button
                  onClick={() => {
                    navigate(`/courses/${user.grade}`);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Explore Courses
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
