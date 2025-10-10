export const getAllGrades = async () => {
  let res = await fetch(
    `http://localhost:5000/api/grades`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  let result = await res.json();
  return { res, result };
};
