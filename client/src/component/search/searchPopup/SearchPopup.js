import React from "react";
import "./SearchPopup.css";
import { useState } from "react";
import { DateRange } from "react-date-range";

function SearchPopup() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const changeHandler = () => {};

  return (
    <form className="searchPopup">
      <h2>Search</h2>
      <div className="searchPopup-destination">
        <label className="searchPopup-destination__label">Destination</label>
        <input
          type="text"
          className="searchPopup-destination__input"
          name="city"
          required={true}
        />
      </div>
      <div className="searchPopup-date">
        <label className="searchPopup-date__label">Check-in Date</label>
        <DateRange
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          onChange={(item) => setState([item.selection])}
          ranges={state}
          className="searchPopup-date__input"
          minDate={new Date()}
        />
        <input
          type="text"
          name="dateStart"
          value={state[0].startDate}
          onChange={changeHandler}
          hidden
        />
        <input
          type="text"
          name="dateEnd"
          value={state[0].endDate}
          onChange={changeHandler}
          hidden
        />
      </div>
      <div className="search-options">
        <div className="search-options__header">Options</div>
        <div className="search-options__content">
          <div className="search-options__maxPrice">
            <label>Max people</label>
            <input type="number" name="maxPeople" min="1" required={true} />
          </div>

          <div className="search-options__room">
            <label>Room</label>
            <input type="number" name="room" min="1" required={true} />
          </div>
        </div>
      </div>
      <button type="submit" className="searchPopup-btn">
        Search
      </button>
    </form>
  );
}
export default SearchPopup;
