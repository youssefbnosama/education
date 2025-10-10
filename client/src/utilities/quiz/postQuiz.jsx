export const postQuiz = async (data) => {
  let res = await fetch(
    `http://localhost:5000/api/postquiz`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body:JSON.stringify(data)
    }
  );
  let result = await res.json();
  return { res, result };
};
