import React from "react";
import "./HomeHotel.css";
import HotelItems from "./HotelItems";
function HomeHotel({ topRating }) {
  console.log('topRating', topRating);
  return (
    <div className="home-hotel">
      <h3>Homes guests love</h3>
      <HotelItems hotelData={topRating} />
    </div>
  );
}
export default HomeHotel;
