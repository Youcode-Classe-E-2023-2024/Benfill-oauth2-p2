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

  if (!TOKEN && !isPublicPage && !window.location.href.includes("home")) {
    redirectTo("/login");
  } else if (TOKEN && isPublicPage) {
    redirectTo("/welcome");
  } else if (window.location.href.includes("home")) {
    document.body.classList.remove("loading-indicator");
  } else if (TOKEN && !isPublicPage) {
    document.body.classList.add("loading-indicator");
    axios
      .get("http://127.0.0.1:8000/api/protected-route", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        // Handle successful response if needed
        document.body.classList.remove("loading-indicator");
      })
      .catch((error) => {
        document.body.classList.remove("loading-indicator");
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

  } else if (error.response && error.response.status === 403) {
    redirectTo("/home");
  } else {
    // Handle other types of errors (network errors, server errors, etc.)
    console.error("An error occurred:", error.message);
    localStorage.clear();
    redirectTo("/login");

    // Optionally, display an error message to the user
  }
};

export default checkAuth;
