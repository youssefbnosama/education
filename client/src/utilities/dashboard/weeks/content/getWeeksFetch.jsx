export const getWeeksFetch = async (courseid) => {
  let res = await fetch(
    `http://localhost:5000/api/dashboard/courses/${courseid}/getweeks`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  let result = await res.json();
  return { res, result };
};
