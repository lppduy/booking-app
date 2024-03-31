import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Home, {
  loader as loaderHotels,
  // action as actionSearch,
} from "./pages/home/Home";
import Detail, { loader as loaderDetailHotel } from "./pages/detail/Detail";
import Search, { loader as loaderSearch } from "./pages/search/Search";
import RootPage from "./layout/Root";
import Authentication, {
  action as actionAuth,
} from "./pages/auth/Authentication";

import BookPage, {
  action as actionPostTransaction,
} from "./pages/book/BookPage";
import TransactionPage, {
  loader as loaderTransactions,
} from "./pages/transaction/TransactionPage";

library.add(fas);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { path: "auth", element: <Authentication />, action: actionAuth },
      {
        path: "",
        element: <Home />,
        loader: loaderHotels,
        // action: actionSearch,
      },
      {
        path: "transaction",
        element: <TransactionPage />,
        loader: loaderTransactions,
      },
      { path: "search", element: <Search />, loader: loaderSearch },
      {
        path: "detail",
        id: "detail-hotel",

        loader: loaderDetailHotel,
        children: [
          { path: "", element: <Detail /> },
          {
            path: "book",
            element: <BookPage />,
            action: actionPostTransaction,
          },
        ],
      },

      ,
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
