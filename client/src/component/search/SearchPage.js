import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import SearchList from "./searchList/SearchList";
import SearchPopup from "./searchPopup/SearchPopup";

import { useLoaderData } from "react-router-dom";
function SearchPage() {
  const dataHotelResult = useLoaderData();
  console.log("dataHotelResult", dataHotelResult);

  return (
    <div className="searchPage">
      <SearchPopup />
      <SearchList searchHotel={dataHotelResult} />
    </div>
  );
}
export default SearchPage;
