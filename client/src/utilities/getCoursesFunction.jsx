export const fetchCourses = async (sec) => {
  try {
    const res = await fetch(`http://localhost:5000/api/courses/${sec}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sec }),
      credentials: "include",
    });
    let result = await res.json();
    if (!res.ok) {
      return { res, result };
    }
    await fetch("http://localhost:5000/api/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((e) => e.json())
      .then((data) => {
        if ((data._id&& result)) {
          result = result.map((course) =>
            data.courses.includes(course._id)
              ? { ...course, paid: true }
              : { ...course, paid: false }
          );
        }
      });
    return { res, result };
  } catch (err) {
    console.error(err);
  }
};
// when use
// let {res,result} = fetchCourses(sec)