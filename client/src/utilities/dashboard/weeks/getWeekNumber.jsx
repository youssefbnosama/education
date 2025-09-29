export const getWeekNumber = async (courseId) => {
  let res = await fetch(
    `http://localhost:5000/api/dashboard/${courseId}/weeknumber`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  let result = await res.json();
  return { res, result };
};
