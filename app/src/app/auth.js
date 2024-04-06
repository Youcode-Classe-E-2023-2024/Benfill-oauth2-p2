import axios from "axios";

const checkAuth = () => {
  const TOKEN = localStorage.getItem("token");
  const PUBLIC_ROUTES = [
    "login",
    "forgot-password",
    "register",
    "documentation",
  ];

  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r)
  );

  if (!TOKEN && !isPublicPage) {
    redirectTo("/login");
  } else if (TOKEN && isPublicPage) {
    redirectTo("/welcome");
  } else if (TOKEN && !isPublicPage) {
    document.body.classList.add("loading-indicator");
    axios.get("http://127.0.0.1:8000/api/protected-route", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((response) => {
        document.body.classList.remove("loading-indicator");
        // Handle successful response if needed
      })
      .catch((error) => {
        handleAuthError(error);
      });
  }
  return TOKEN;
};

const redirectTo = (path) => {
  window.location.href = path;
};

const handleAuthError = (error) => {
  // Handle authentication error
  if (error.response && error.response.status === 401) {
    localStorage.clear();
    redirectTo("/login");
  } else {
    // Handle other types of errors (network errors, server errors, etc.)
    console.error("An error occurred:", error.message);
    // Optionally, display an error message to the user
  }
};

export default checkAuth;
