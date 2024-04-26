import { useLayoutEffect } from "react";

export default function Home() {
  useLayoutEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      if (user.roles[0].role_name !== "admin") {
        console.log(user.roles[0].role_name);
        window.location.href = "http://localhost:3006/app";
      }
    }
  });
  return <div>Home</div>;
}
