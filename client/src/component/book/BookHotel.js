import { Form, useRouteLoaderData } from "react-router-dom";
import { DateRange } from "react-date-range";
import style from "./BookHotel.module.css";
import { useState } from "react";

function BookHotel() {
  const [valueRooms, setValueRooms] = useState([]);

  // total price
  const [valuePrice, setValuePrice] = useState(0);

  //rooms
  const [roomsResult, setRoomsResult] = useState([]);

  // get data rooms
  const data = useRouteLoaderData("detail-hotel");
  const { dataRooms, dataHotel, dataTransactionsId } = data;
  console.log("data", data);
  // state date
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // change input handler
  const changeHandler = () => {};

  // calculate Price
  const calculatePrice = (d1, d2, priceRoom) => {
    const difference = d1.getTime() - d2.getTime();
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    const totalPrice = totalDays * priceRoom;
    return totalPrice;
  };

  //change rooms input checkbox
  const changeRoomsHandler = (e) => {
    console.log(e.target.parentElement.parentElement.id);
    if (roomsResult.length > 0) {
      const idRooms = e.target.parentElement.parentElement.id;

      const room = roomsResult.find((r) => {
        return r._id === idRooms;
      });

      if (room) {
        room.roomNumbers.forEach((rm) => {
          if (e.target.checked && e.target.value === rm.toString()) {
            const roomId = valueRooms.find((idR) => {
              return idR.id === room._id;
            });
            console.log(roomId);
            // kiểm tra xem đã có room id đó trong room chưa
            // nếu có thì chỉ thêm số phòng vào
            if (roomId) {
              roomId.roomNumbers.push(rm);
              const addRoomNumber = {
                id: roomId.id,
                roomNumbers: roomId.roomNumbers,
              };

              const indexRoomClear = valueRooms.findIndex(
                (item) => item.id === roomId.id
              );
              const a1 = valueRooms.slice(0, indexRoomClear);
              const a2 = valueRooms.slice(
                indexRoomClear + 1,
                valueRooms.length
              );
              setValueRooms([...a1, addRoomNumber, ...a2]);
              const roomPrice = calculatePrice(
                state[0].endDate,
                state[0].startDate,
                room.price
              );
              setValuePrice((prevState) => prevState + Number(roomPrice));
            }
            // nếu không có thì thêm object room gồm id và roomNumber vào
            else {
              setValueRooms((prevState) => [
                ...prevState,
                { id: room._id, roomNumbers: [rm] },
              ]);
              const roomPrice = calculatePrice(
                state[0].endDate,
                state[0].startDate,
                room.price
              );

              setValuePrice((prevState) => prevState + Number(roomPrice));
            }
          }
          // nếu bỏ checked vào các checkbox đã chọn
          if (!e.target.checked && e.target.value === rm.toString()) {
            // tìm room trong valueRooms
            const roomChecked = valueRooms.find((r) => r.id === room._id);

            // index của room trong valueRooms click vào
            const roomIndex = valueRooms.findIndex(
              (r) => r.id === roomChecked.id
            );

            //phần trước và sau của valueRooms không có room đã change
            const a3 = valueRooms.slice(0, roomIndex);
            const a4 = valueRooms.slice(roomIndex + 1, valueRooms.length);

            // set value price
            const roomPrice = calculatePrice(
              state[0].endDate,
              state[0].startDate,
              room.price
            );

            setValuePrice((prevState) => prevState - roomPrice);

            //nếu còn nhiều phòng khác
            if (roomChecked && roomChecked.roomNumbers.length > 1) {
              const roomNumberDelete = roomChecked.roomNumbers.findIndex(
                (r) => r.toString() === e.target.value
              );

              const a1 = roomChecked.roomNumbers.slice(0, roomNumberDelete);
              const a2 = roomChecked.roomNumbers.slice(
                roomNumberDelete + 1,
                roomChecked.roomNumbers.length
              );
              const newRoomNumber = [...a1, ...a2];
              const newRoom = {
                id: roomChecked.id,
                roomNumbers: newRoomNumber,
              };

              //thay đổi valueRooms

              setValueRooms([...a3, newRoom, ...a4]);
            } else {
              setValueRooms([...a3, ...a4]);
            }
          }
        });
      }
    }
  };

  // price for the total
  console.log(valuePrice);

  // lọc n array có giá trị không trùng nhau
  function filterUniqueValues(arrays) {
    // Hợp nhất tất cả các mảng con thành một mảng duy nhất
    var mergedArray = arrays.reduce(function (a, b) {
      return a.concat(b);
    }, []);

    // Đếm số lần xuất hiện của từng phần tử trong mảng
    var count = mergedArray.reduce(function (obj, value) {
      obj[value] = (obj[value] || 0) + 1;
      return obj;
    }, {});

    // Lọc các phần tử chỉ xuất hiện 1 lần
    var uniqueValues = Object.keys(count).filter(function (value) {
      return count[value] === 1;
    });

    return uniqueValues;
  }

  //lọc n array có giá trị trùng nhau
  function filterSameValues(arrays) {
    // Hợp nhất tất cả các mảng con thành một mảng duy nhất
    var mergedArray = arrays.reduce(function (a, b) {
      return a.concat(b);
    }, []);

    // Đếm số lần xuất hiện của từng phần tử trong mảng
    var count = mergedArray.reduce(function (obj, value) {
      obj[value] = (obj[value] || 0) + 1;
      return obj;
    }, {});

    // Lọc các phần tử chỉ xuất hiện 1 lần
    var uniqueValues = Object.keys(count).filter(function (value) {
      return count[value] !== 1;
    });

    return uniqueValues;
  }

  //
  function filterUniqueValues2(arrays) {
    // Hợp nhất tất cả các mảng con thành một mảng duy nhất
    var mergedArray = arrays.reduce(function (a, b) {
      return a.concat(b);
    }, []);

    // Lọc các giá trị không trùng nhau
    var uniqueValues = mergedArray.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });

    return uniqueValues;
  }

  // click button New Date
  const clickDateRangeHandler = (e) => {
    const S = new Date(state[0].startDate);
    const E = new Date(state[0].endDate);

    // hàm kiểm tra những phòng nào còn trống trả về các phòng đã đặt
    const checkFuction = (transactions, room) => {
      const TS = new Date(transactions.dateStart);
      const TE = new Date(transactions.dateEnd);
      const roomTransactions = transactions.rooms.find((r) => {
        return r.id === room._id;
      });

      if (
        (S <= TS && TS <= E) ||
        (S <= TE && TE <= E) ||
        (TS <= S && TE >= E)
      ) {
        console.log("room.roomNumbers", room.roomNumbers);
        const roomNumbers = filterSameValues([
          roomTransactions.roomNumbers,
          room.roomNumbers,
        ]);
        console.log("roomNumbers", roomNumbers);
        return roomNumbers;
      }
      return [];
    };
    const resultRooms = dataRooms.map((room) => {
      const transactionRoom = dataTransactionsId.filter((tr) => {
        return tr.rooms.some((r) => String(r.id) === String(room._id));
      });
      console.log(transactionRoom);

      // transactionRoom.length > 1
      if (transactionRoom.length > 1) {
        //kiểm tra xem phong đó có được đặt trong ngày đó hay chưa
        console.log("transactionRoom > 1");
        const roomsBooked = transactionRoom
          .map((tr) => {
            return checkFuction(tr, room);
          })
          .reduce((acc, r) => acc.concat(r), []);

        //

        // số phòng còn trống
        const roomNumbersEmpty = filterUniqueValues([
          roomsBooked,
          room.roomNumbers,
        ]);
        console.log("roomNumbersEmpty", roomNumbersEmpty);
        const emptyRooms = { ...room, roomNumbers: roomNumbersEmpty };
        console.log("roomsBooked", roomsBooked);
        console.log("emptyRoooms", emptyRooms);
        return roomNumbersEmpty.length !== 0 ? emptyRooms : undefined;
      }

      // transactionRoom.length === 1
      else if (transactionRoom.length === 1) {
        console.log("transactionRoom === 1");
        const roomsBooked = checkFuction(transactionRoom[0], room);
        const roomNumbersEmpty = filterUniqueValues([
          roomsBooked,
          room.roomNumbers,
        ]);
        return roomsBooked
          ? { ...room, roomNumbers: roomNumbersEmpty }
          : undefined;
      }
      //kiểm tra xem phong đó có được đặt trong ngày đó hay chưa
      console.log("transactionRooms === 0");
      return room;
    });
    console.log("resultRoom:", resultRooms);
    setRoomsResult(resultRooms.filter(Boolean));
  };
  return (
    <Form method="POST" className={style.bookForm}>
      <div className={style.info}>
        <div className={style.header}>
          <h2>Dates</h2>
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            onChange={(item) => setState([item.selection])}
            ranges={state}
            className={style.date}
            minDate={new Date()}
          />
          <div className={style.btn}>
            <button
              type="button"
              onClick={clickDateRangeHandler}
              className={style.button}
            >
              Filter Rooms
            </button>
          </div>
        </div>

        <div className={style.formReseve}>
          <h2>Resever info</h2>
          <div className={style.reseverInput}>
            <label htmlFor="name">Your Full Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              required={true}
            />
          </div>
          <div className={style.reseverInput}>
            <label htmlFor="email">Your Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required={true}
            />
          </div>
          <div className={style.reseverInput}>
            <label htmlFor="phone">Your phone Number:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="phone number"
              required={true}
            />
          </div>
          <div className={style.reseverInput}>
            <label htmlFor="card">Your identity card number:</label>
            <input
              type="text"
              name="card"
              id="card"
              placeholder="card number"
              required={true}
            />
          </div>
        </div>
      </div>
      <div className={style.selectRooms}>
        <h2>Select Rooms</h2>
        <div className={style.content}>
          {roomsResult &&
            roomsResult.map((item) => (
              <div key={item._id} className={style.rooms} id={item._id}>
                <div className={style.contentRooms}>
                  <p>
                    <strong>{item.title}</strong>
                  </p>
                  <p>{item.desc}</p>
                  <p>{`Max People: ${item.maxPeople}`}</p>
                  <p>
                    <strong>{`$ ${item.price}`}</strong>
                  </p>
                </div>
                {item.roomNumbers &&
                  item.roomNumbers.map((i) => (
                    <div className={style.roomNumbers} key={i}>
                      <label htmlFor={item._id + i}>{i}</label>
                      <input
                        type="checkbox"
                        name="roomNumbers"
                        id={item._id + i}
                        value={i}
                        onChange={changeRoomsHandler}
                      />
                    </div>
                  ))}
              </div>
            ))}
          <input
            type="text"
            name="rooms"
            value={JSON.stringify(valueRooms)}
            onChange={changeHandler}
            hidden
          />
          <input
            type="text"
            name="hotel"
            value={JSON.stringify({
              id: dataHotel._id,
              hotelName: dataHotel.name,
            })}
            onChange={changeHandler}
            hidden
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
          <input
            type="number"
            name="price"
            value={valuePrice}
            onChange={changeHandler}
            hidden
          />
          <input
            type="text"
            name="status"
            value={"booked"}
            onChange={changeHandler}
            hidden
          />
        </div>
      </div>
      <div className={style.payment}>
        <h2>Total Bill </h2>
        <div>
          <select required={true} name="payment">
            <option value="">Select payment method</option>
            <option value="cash">Cash</option>
            <option value="credit Card">Credit Card</option>
          </select>
          {valueRooms.length === 0 && (
            <button type="submit" className={style.btnDisabled} disabled>
              Resever Now
            </button>
          )}
          {valueRooms.length > 0 && <button type="submit">Resever Now</button>}
        </div>
      </div>
    </Form>
  );
}
export default BookHotel;
