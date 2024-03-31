import { RouterProvider } from "react-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { createBrowserRouter } from "react-router-dom";
import DashBoard, { loader as loaderDashBoard } from "./page/DashBoard";
import HotelBoardPage, {
  loader as loaderAdminHotel,
  action as actionDeleteHotel,
} from "./page/HotelBoard";
import NewHotelPage, {
  loader as loaderTitleRoom,
  action as actionPostAddHotel,
} from "./page/NewHotel";
import RoomPage, {
  loader as loaderRooms,
  action as actionDeleteRoom,
} from "./page/RoomPage";
import NewRoomPage, {
  loader as loaderNameHotels,
  action as actionAddRoom,
} from "./page/NewRoom";
import TransactionAdminPage, {
  loader as loaderAdminTransaction,
} from "./page/TransationAdminPage";
import RootAdmin from "./layout/RootAdmin";
import UsersPage, { loader as loaderUsers } from "./page/UserPage";
import Authentication, { action as actionAuth } from "./page/Authentication";

library.add(fas);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootAdmin />,
    children: [
      { path: "auth", element: <Authentication />, action: actionAuth },

      { path: "", element: <DashBoard />, loader: loaderDashBoard },
      {
        path: "hotels",
        element: <HotelBoardPage />,
        loader: loaderAdminHotel,
        action: actionDeleteHotel,
      },
      {
        path: "addHotel",
        element: <NewHotelPage />,
        action: actionPostAddHotel,
        loader: loaderTitleRoom,
      },
      {
        path: "rooms",
        element: <RoomPage />,
        loader: loaderRooms,
        action: actionDeleteRoom,
      },
      {
        path: "addRoom",
        element: <NewRoomPage />,
        loader: loaderNameHotels,
        action: actionAddRoom,
      },
      {
        path: "transaction",
        element: <TransactionAdminPage />,
        loader: loaderAdminTransaction,
      },
      {
        path: "user",
        element: <UsersPage />,
        loader: loaderUsers,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
