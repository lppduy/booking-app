import React from "react";
import HomeType from "./homeType/HomeType";
import HomeHotel from "./homeHotel/HomeHotel";
import HomeCity from "./homecity/HomeCity";
import Form from "./form/Form";
import lodash from "lodash";

import "./HomePage.css";
import { useLoaderData } from "react-router";
function HomePage() {
  const dataHotels = useLoaderData();

  // city hotels
  const quantityHotelHN = dataHotels.filter((h) => h.city === "Ha Noi").length;
  const quantityHotelHCM = dataHotels.filter(
    (h) => h.city === "Ho Chi Minh"
  ).length;
  const quantityHotelDN = dataHotels.filter((h) => h.city === "Da Nang").length;
  const quantityHotel = {
    quantityHotelHN,
    quantityHotelHCM,
    quantityHotelDN,
  };

  // top rating
  const topRating = lodash
    .sortBy(dataHotels, (h) => h.rating)
    .reverse()
    .splice(0, 3);
  return (
    <div className="home-page">
      <HomeCity quantityHotel={quantityHotel} />
      <HomeType dataHotels={dataHotels} />
      <HomeHotel topRating={topRating} />
      <Form />
    </div>
  );
}
export default HomePage;
