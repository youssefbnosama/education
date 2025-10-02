import { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { getWeeksFetch } from "@/utilities/dashboard/weeks/content/getWeeksFetch";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Sample physics weeks data
const weeksData = [
  {
    title: "Week 1 - Mechanics",
    contents: [
      {
        title: "Lecture 1 - Newton's Laws",
        type: "video",
        url: "https://youtu.be/GNJE__4ZtvE?si=mrtgdeIqT44bltS9",
      },
      {
        title: "Lecture Notes - Newton's Laws",
        type: "pdf",
        url: "https://pdfobject.com/pdf/sample.pdf",
      },
      { title: "Homework on Newton's Laws", type: "quiz" },
    ],
  },
  {
    title: "Week 2 - Thermodynamics",
    contents: [
      {
        title: "Lecture 2 - Heat Transfer",
        type: "video",
        url: "https://example.com/heat-video",
      },
      { title: "quiz - Heat Transfer", type: "quiz" },
    ],
  },
];

export function Week({ fromDash }) {
  const [openWeek, setOpenWeek] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const { courseid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      const { res, result } = await getWeeksFetch(courseid);

      if (!res.ok) {
        console.log(result.message);
        return;
      }
      console.log(result);
      setWeeks(result);
    };

    loadCourses();
  }, [courseid]);

  const handleContentClick = (item) => {
    if (item.type === "video" || item.type === "pdf") {
      window.open(item.url, "_blank");
    } else if (item.type === "quiz") {
      console.log("Quiz clicked:", item.title); // placeholder for quiz logic
    }
  };

  const getEmoji = (type) => {
    if (type === "video") return "▶️";
    if (type === "pdf") return "📄";
    if (type === "quiz") return "❓";
    return "";
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      {weeks && weeks.length > 0 ? (
        weeks.map((week, index) => (
          <div key={index} className="border rounded-xl overflow-hidden shadow">
            {/* Week header */}
            <button
              className="w-full flex justify-between items-center bg-blue-500 text-white px-4 py-3 font-semibold"
              onClick={() =>
                fromDash
                  ? navigate(week._id)
                  : setOpenWeek(openWeek === index ? null : index)
              }
            >
              {week.title}
              <span>{openWeek === index ? "▲" : "▼"}</span>
            </button>

            {/* Week contents */}
            <AnimatePresence>
              {openWeek === index && week.contents && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 divide-y"
                >
                  {week.contents.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleContentClick(item)}
                    >
                      <span>{item.title}</span>
                      <span>{getEmoji(item.type)}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          No weeks available at the moment.
        </p>
      )}
    </div>
  );
}
