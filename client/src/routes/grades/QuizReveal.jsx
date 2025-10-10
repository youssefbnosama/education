import React, { useEffect, useState } from "react";
import { getSpecificGrade } from "@/utilities/grades/GetSpecificGrade";
import { useParams } from "react-router-dom";

export function QuizResultPage() {
  const [grade, setGrade] = useState(null);
  const { gradeid } = useParams();

  useEffect(() => {
    const loading = async () => {
      const { res, result } = await getSpecificGrade(gradeid);
      if (!res.ok) {
        console.log(result.message);
      } else {
        setGrade(result);
        console.log(result)
      }
    };
    loading();
  }, [gradeid]);

  if (!grade?.data)
    return <p className="text-center text-gray-500">Loading...</p>;

  const { title, score, totalQuestions, createdAt, data } = grade;
  const scorePercentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        <p className="text-lg font-medium">
          <span className="text-blue-600 font-semibold">Score:</span> {score} /{" "}
          {totalQuestions}
        </p>
        <p className="text-lg font-medium">
          <span className="text-green-600 font-semibold">Percentage:</span>{" "}
          {scorePercentage}%
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {createdAt && new Date(createdAt.$date || createdAt).toLocaleString()}
        </p>
      </div>

      {/* Questions Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {data?.map((item, index) => {
          const isCorrect = item.selected === item.correctAnswer;
          return (
            <div
              key={index}
              className={`p-5 rounded-2xl shadow-lg border-2 ${
                isCorrect
                  ? "border-green-400 bg-green-50"
                  : "border-red-400 bg-red-50"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">
                Q{index + 1}. {item.questionTitle}
              </h3>

              <div className="text-gray-800">
                <p>
                  <span className="font-semibold">Your Answer:</span>{" "}
                  <span
                    className={`${
                      isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {item.chosenTitle}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Correct Answer:</span>{" "}
                  <span className="text-green-700">
                    {item.correctAnswerTitle}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
