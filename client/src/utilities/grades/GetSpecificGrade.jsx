export const getSpecificGrade = async (gradeid) => {
  let res = await fetch(
    `http://localhost:5000/api/grades/${gradeid}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  let result = await res.json();
  return { res, result };
};
