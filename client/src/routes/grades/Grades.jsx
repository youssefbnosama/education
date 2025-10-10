import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getAllGrades } from "@/utilities/grades/GetAllGrades";

export  function Grades({ exams }) {
  const [grades, setGrades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let loading = async () => {
      const { res, result } = await getAllGrades();
      if (!res.ok) {
        console.log(result.message);
      } else {
        setGrades(result);
      }
    };
    loading();
  }, []);
  if (!grades || grades.length === 0)
    return <p className="text-center text-gray-500 mt-10">No exams found</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Grades</h1>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-700">#</th>
              <th className="p-4 font-semibold text-gray-700">Quiz Title</th>
              <th className="p-4 font-semibold text-gray-700">Score</th>
              <th className="p-4 font-semibold text-gray-700">Date</th>
              <th className="p-4 font-semibold text-gray-700 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {grades.map((exam, index) => (
              <tr
                key={exam._id?.$oid || index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 text-gray-600">{index + 1}</td>
                <td className="p-4 font-medium text-gray-800">{exam.title}</td>
                <td className="p-4 text-gray-700">
                  {exam.score} / {exam.totalQuestions} (
                  {Math.round((exam.score / exam.totalQuestions) * 100)}%)
                </td>
                <td className="p-4 text-gray-600">
                  {new Date(
                    exam.createdAt?.$date || exam.createdAt
                  ).toLocaleString()}
                </td>
                <td className="p-4 text-center">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                     navigate(exam.quizId)
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
