export const fetchFunction = async (
  endPoint,
  method,
  hasHeaders = true,
  body = null,
  isRetry = false // 🆕 نضيف متغير جديد
) => {
  const details = {
    method,
    credentials: "include",
  };

  if (body) {
    details.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  if (hasHeaders && !(body instanceof FormData)) {
    details.headers = { "Content-Type": "application/json" };
  }

  const res = await fetch(`http://localhost:5000${endPoint}`, details);
  const result = await res.json();

  if (result.message === "Access Denied. No token provided." && !isRetry) {
    const { res: refreshRes } = await fetchFunction(
      "/api/refreshtoken",
      "POST",
      true,
      null,
      true
    );

    if (refreshRes.ok) {
      return await fetchFunction(endPoint, method, hasHeaders, body, true);
    } else {
      result.navigateToLogin = true;
      return { res, result };
    }
  }

  return { res, result };
};
