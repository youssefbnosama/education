import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getWeekNumber } from "@/utilities/dashboard/weeks/getWeekNumber";
import { useParams,useNavigate } from "react-router-dom";

export function AddWeek() {
  const [weekNumber, setWeekNumber] = useState("");
  const [title, setTitle] = useState("");
  const { courseid } = useParams();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { courseid, priority: +weekNumber, title };
    let res = await fetch(
      `http://localhost:5000/api/dashboard/addweek/${courseid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );
    let result = await res.json();
    if (!res.ok) {
      console.log(result.message);
      return;
    }
    navigate("/dashboard")
  };

  useEffect(() => {
    const loadCourses = async () => {
      const { res, result } = await getWeekNumber(courseid);
      if (!res.ok) {
        console.log(result);
        return;
      }

      setWeekNumber(result.num);
    };

    loadCourses();
  }, [courseid]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center items-center min-h-screen bg-gray-50"
    >
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Add Week</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Week Number</label>
              <Input
                type="number"
                value={weekNumber}
                onChange={(e) => setWeekNumber(e.target.value)}
                placeholder="Enter week number"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Title</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </div>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
