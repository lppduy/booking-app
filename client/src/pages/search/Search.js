import SearchPage from "../../component/search/SearchPage";

import Form from "../../component/home/homePage/form/Form";
import { getAuthUser } from "../../util/token";
import { json, redirect } from "react-router";

const Search = () => {
  return (
    <div>
      <SearchPage />
      <Form />
    </div>
  );
};

export default Search;

export async function loader({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const dataSearch = {
    city: searchParams.get("city"),
    dateStart: searchParams.get("dateStart"),
    dateEnd: searchParams.get("dateEnd"),
    maxPeople: searchParams.get("maxPeople"),
    room: searchParams.get("room"),
  };
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  const response = await fetch(
    `http://localhost:8080/hotels/search?city=${dataSearch.city}&dateStart=${dataSearch.dateStart}&dateEnd=${dataSearch.dateEnd}&room=${dataSearch.room}&maxPeople=${dataSearch.maxPeople}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }
  );
  if (response.status === 401) {
    alert("Please Login");
    return redirect("/auth?mode=login");
  }
  if (!response.ok) {
    throw json({ message: "fetch failed" }, { status: 500 });
  }

  const data = await response.json();
  console.log('data', data);
  return data;
}
