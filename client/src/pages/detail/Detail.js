import Form from "../../component/home/homePage/form/Form";
import DetailPage from "../../component/detail/DetailPage";
import { json } from "react-router";
import { getAuthUser } from "../../util/token";
const Detail = () => {
  return (
    <div>
      <DetailPage />
      <Form />
    </div>
  );
};

export default Detail;
export async function loader({ request, params }) {
  const searchParams = new URL(request.url).searchParams;
  const id = searchParams.get("id");
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`http://localhost:8080/hotels/detail?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });

  if (!response.ok) {
    throw json({ message: "error loading detail" }, { status: 404 });
  }
  const dataHotel = await response.json();
  console.log("dataHotel", dataHotel)

  const rooms = { rooms: dataHotel.rooms };

  const responseRooms = await fetch("http://localhost:8080/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify(rooms),
  });
  if (!responseRooms.ok) {
    throw json({ message: "Error fetching" }, { status: 404 });
  }
  const dataRooms = await responseRooms.json();

  const responseTransactions = await fetch(
    `http://localhost:8080/transactions/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }
  );
  if (!responseTransactions.ok) {
    throw json({ message: "error loading detail" }, { status: 404 });
  }
  const dataTransactionsId = await responseTransactions.json();
  return { dataHotel, dataRooms, dataTransactionsId };
}
