import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Question({
  title,
  correctAnswer,
  options,
  onAnswered,
  questionIndex,
  chosenAnswer,
}) {
  const [selected, setSelected] = useState(null);
  const [theCorrectAnswer, setTheCorrectAnswer] = useState("");
  const alphapet = ["a", "b", "c", "d"];

  useEffect(() => {
    if (options?.length > 0 && correctAnswer) {
      const correctIndex = alphapet.findIndex((e) => e === correctAnswer);
      setTheCorrectAnswer(options[correctIndex]?.title || null);
    }
  }, [options, correctAnswer]);

  // ✅ Sync chosenAnswer when question changes
  useEffect(() => {
    if (chosenAnswer?.selected) {
      setSelected(chosenAnswer.selected);
    } else {
      setSelected(null);
    }
  }, [chosenAnswer]);

  const handleClick = (
    idx,
    optionLetter,
    correctAnswer,
    questionTitle,
    optionTitle,
    correctAnswerTitle
  ) => {
    setSelected(optionLetter);
    onAnswered(
      idx,
      optionLetter,
      correctAnswer,
      questionTitle,
      optionTitle,
      correctAnswerTitle
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen bg-gray-50"
    >
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            {title || "Title"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {options &&
            options.map((opt, idx) => {
              const letter = alphapet[idx];
              const isSelected = selected === letter;
              return (
                <motion.div
                  key={idx}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <Button
                    onClick={() =>
                      handleClick(
                        questionIndex,
                        letter,
                        correctAnswer,
                        title,
                        opt.title,
                        theCorrectAnswer
                      )
                    }
                    className={`w-full justify-start text-left rounded-xl py-6 text-lg transition-colors ${
                      isSelected
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {opt.title}
                  </Button>
                </motion.div>
              );
            })}
        </CardContent>
      </Card>
    </motion.div>
  );
}
