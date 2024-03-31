import React, { useEffect, useState } from "react";
import "./SearchList.css";
import SearchItem from "./SearchItem";
function SearchList({ searchHotel }) {
  const searchItems = require("../../../data/search.json");

  return (
    <div className="search-list">
      {searchHotel.length !== 0 &&
        searchHotel.map((item) => {
          return <SearchItem key={item.name} item={item} />;
        })}
      {searchHotel.length === 0 && <p className="no-hotel">No Hotels found</p>}
    </div>
  );
}
export default SearchList;
