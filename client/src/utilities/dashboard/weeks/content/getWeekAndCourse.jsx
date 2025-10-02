export const getWeekAndCourse = async (weekId) => {
  let res = await fetch(
    `http://localhost:5000/api/getweekandcourse/${weekId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  let result = await res.json();
  return { res, result };
};
