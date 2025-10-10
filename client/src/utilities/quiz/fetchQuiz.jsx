export const getQuiz = async (weekid, quizId) => {
  let res = await fetch(
    `http://localhost:5000/api/weeks/${weekid}/getquiz/${quizId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  let result = await res.json();
  return { res, result };
};
