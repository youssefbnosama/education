import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Question from "./Question"; // question component
import { getQuiz } from "@/utilities/quiz/fetchQuiz";
import { useParams } from "react-router-dom";
import { postQuiz } from "../../utilities/quiz/postQuiz";
import { useNavigate } from "react-router-dom";

export function QuestionsPage() {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [answered, setAnswered] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const { weekid, quizid } = useParams();
  const navigate = useNavigate();
  // mark question as answered
  const markAnswered = (
    idx,
    selected,
    correctAnswer,
    questionTitle,
    chosenTitle,
    correctAnswerTitle
  ) => {
    if (answered.length === 0) {
      setAnswered([
        {
          idx,
          selected,
          correctAnswer,
          questionTitle,
          chosenTitle,
          correctAnswerTitle,
        },
      ]);
    } else {
      setAnswered((prev) => {
        let doesExist = false;
        const updated = prev.map((e) => {
          if (e.idx === idx) {
            doesExist = true;
            return {
              idx,
              selected,
              correctAnswer,
              questionTitle,
              chosenTitle,
              correctAnswerTitle,
            };
          } else {
            return e;
          }
        });

        if (!doesExist) {
          return [
            ...updated,
            {
              idx,
              selected,
              correctAnswer,
              questionTitle,
              chosenTitle,
              correctAnswerTitle,
            },
          ];
        }
        return updated;
      });
    }
  };

  // getting Data
  useEffect(() => {
    const loading = async () => {
      const { res, result } = await getQuiz(weekid, quizid);
      if (!res.ok) {
        console.log(result.message);
        return;
      }
      setTotalQuestions(result.data.quizLength);
      setData(result.data.quiz);
      setUserId(result.userId);
      setTitle(result.data.title);
    };
    loading();
  }, []);

  let currentChosen = answered.find((e) => e.idx === currentQuestion);

  let submitFunction = async () => {
    if (answered.length === totalQuestions) {
      let data = {
        userId,
        weekId: weekid,
        quizId: quizid,
        title: `${title}'s quiz`,
        data: answered,
        totalQuestions,
      };
      console.log(data);
      const { res, result } = await postQuiz(data);
      if (!res.ok) {
        console.log(result.message);
      } else {
        navigate(`/grads/${quizid}`);
      }
    } else {
      setError("You must finish the exam");
    }
  };
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center p-6 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Quiz: {title || "Title"}
      </motion.h1>
      {error && <p className="text-red-600">{error}</p>}
      {/* Stats */}
      <motion.div
        className="flex gap-6 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="px-6 py-3 shadow-md">
          <CardContent className="flex flex-col items-center">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-xl font-bold">{totalQuestions}</p>
          </CardContent>
        </Card>
        <Card className="px-6 py-3 shadow-md">
          <CardContent className="flex flex-col items-center">
            <p className="text-sm text-gray-600">Answered</p>
            <p className="text-xl font-bold text-blue-600">{answered.length}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Question selector buttons */}
      <motion.div
        className="grid grid-cols-5 gap-3 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {Array.from({ length: totalQuestions }).map((_, idx) => (
          <motion.div whileHover={{ scale: 1.1 }} key={idx}>
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(idx)}
              className={`w-12 h-12 rounded-full transition-colors ${
                answered.some((e) => e.idx === idx)
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Current Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl"
      >
        <Question
          title={data[currentQuestion]?.title || ""}
          options={data[currentQuestion]?.options || []}
          correctAnswer={data[currentQuestion]?.correctAnswer || ""}
          questionIndex={currentQuestion}
          onAnswered={markAnswered}
          chosenAnswer={currentChosen}
        />
      </motion.div>

      {/* Submit button */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={() => submitFunction()}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg rounded-xl shadow-lg"
        >
          Submit Quiz
        </Button>
      </motion.div>
    </motion.div>
  );
}
