import React from "react";
import "./HomeCity.css";
import CityItems from "./CityItems";
function HomeCity({ quantityHotel }) {
  const cityHotels = [
    {
      name: "Da Nang",
      properties: quantityHotel.quantityHotelDN,
      img: "./images/city Image/Da Nang.jpg",
    },
    {
      name: "Ha Noi",
      properties: quantityHotel.quantityHotelHN,
      img: "./images/city Image/Ha Noi.jpg",
    },
    {
      name: "Ho Chi Minh",
      properties: quantityHotel.quantityHotelHCM,
      img: "./images/city Image/HCM.jpg",
    },
  ];
  return (
    <div className="home-city">
      <CityItems cityHotels={cityHotels} />
    </div>
  );
}
export default HomeCity;
