import HomePage from "../../component/home/homePage/HomePage";
import Header from "../../component/home/header/Header";
import { json, redirect } from "react-router";
import { getAuthUser } from "../../util/token";

const Home = () => {
  return (
    <div>
      <Header />
      <HomePage />
    </div>
  );
};

export default Home;

export async function loader() {

  const response = await fetch("http://localhost:8080/hotels/listHotel", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  });


  if (response.status === 401) {
    alert("Please Login");
    return redirect("/auth?mode=login");
  }
  if (!response.ok) {
    throw json({ message: "fetch failed" }, { status: 500 });
  }

  const data = await response.json();
  console.log(">>>>>>>", data)
  return data;
}
