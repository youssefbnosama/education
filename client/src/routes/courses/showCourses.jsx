import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseCard from "./Course";

export function ShowCourses() {
  const navigate = useNavigate();
  const navigations = ["account", "courses", "explore", "grades"];
  const [courses, setCourses] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { sec } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${sec}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sec }),
          credentials: "include",
        });

        if (!res.ok) {
          setNotFound(true);
          return;
        }

        const result = await res.json();
        setCourses(result);
      } catch (err) {
        console.error(err);
        setNotFound(true);
      }
    };

    fetchCourses();
  }, [sec]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {<Sidebar />}

      {/* Main Content */}
      <main className="flex-1 px-6 py-10">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-primary mb-4"
        >
          Sec-3 Courses
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground mb-8 max-w-2xl"
        >
          Here are the courses of Sec 3 where you can explore different subjects
          and learn step by step.
        </motion.p>

        {/* Single Course Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {courses &&
            courses.map((e) => (
              <CourseCard
                key={e._id}
                title={e.title}
                description={e.description}
                image={e.image}
                price={e.price}
                grade={e.grade}
              />
            ))}
        </motion.div>
      </main>
    </div>
  );
}
