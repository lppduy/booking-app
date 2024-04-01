import { json, redirect } from "react-router";
import Auth from "../../component/auth/Auth";

function Authentication() {
  return <Auth />;
}

async function authenticate(mode, authData) {
  const response = await fetch(`http://localhost:8080/auth/${mode}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (!response.ok) {
    throw json({ message: "could not authenticate user!" }, { status: 500 });
  }

  return response.json();
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "unsupported mode" }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const dataResult = await authenticate(mode, authData);

  if (mode === "signup") {
    alert("created user successfully!!!");
    return redirect("/auth?mode=login");
  } else if (mode === "login") {
    localStorage.setItem("accessToken", dataResult.accessToken);
    localStorage.setItem("user", JSON.stringify(dataResult.user));
    return redirect("/");
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    return redirect("/auth?mode=login");
  }
}

export default Authentication;