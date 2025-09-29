import CourseCard from "@/routes/courses/Course";
import { Sidebar } from "@/routes/Sidebar";
import { fetchCourses } from "@/utilities/getCoursesFunction";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";


export function ShowCoursesToDash() {
  const [notFound, setNotFound] = useState(false);
  const [courses, setCourses] = useState([]);
  const { sec } = useParams();
  useEffect(() => {
    const loadCourses = async () => {
      const { res, result } = await fetchCourses(sec);

      if (!res.ok) {
        setNotFound(true);
        return;
      }

      setCourses(result);
    };

    loadCourses();
  }, [sec]);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
        
      {/* Main Content */}
      <main className="flex-1 px-6 py-10">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-primary mb-4"
        >
          {sec} Courses
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground mb-8 max-w-2xl"
        >
          Here are the courses of {sec} where you can explore different subjects
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
                id={e._id}
                paid={e.paid}
                fromDash={true}
              />
            ))}
        </motion.div>
      </main>
    </div>
  );
}
