const { Error } = require("./error");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");
//get hotel as home
exports.getHotels = (req, res, next) => {
  Hotel.find()
    .exec()
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

//get detail hotel
exports.getDetail = (req, res, next) => {
  Hotel.findById(req.query.id)
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

//get search hotels
exports.getHotelSearch = async (req, res, next) => {
  try {
    const { city, dateStart, dateEnd, maxPeople, room } = req.query;
    const dateStartSearch = new Date(dateStart);
    const dateEndSearch = new Date(dateEnd);

    // Tìm khách sạn theo thành phố
    const hotels = await Hotel.find({ city });
    console.log("hotel", hotels);

    // Lọc khách sạn có phòng trống trong khoảng thời gian
    const filteredHotels = await Promise.all(
      hotels.map(async (hotel) => {
        const roomIds = hotel.rooms;

        const roomAll = await Room.find({ _id: { $in: roomIds } });
        console.log("roomAll", roomAll);

        // tìm các phòng phù hợp với yêu cầu số người lớn nhất trong phòng và lượng phòng còn trống
        const roomMacth = await Promise.all(
          roomAll.map(async (r) => {
            //tổng số lượng phòng
            const totalRooms = r.roomNumbers.length;

            // nếu số người lớn nhất trong phòng được người dùng điền vào và số người lớn nhất trong phòng >= số người lớn nhất được người dùng yêu cầu
            if (maxPeople ? r.maxPeople >= Number(maxPeople) : true) {
              //tìm trong transaction có khách sạn nào trùng về phòng và thời gian đặt không
              const transactions = await Transaction.find({
                //tìm id hotel trùng với hotel đang kiểm tra
                "hotel.id": hotel._id,

                //tìm phòng trùng với phòng đang kiểm tra
                rooms: { $elemMatch: { id: r._id } },

                //tìm ngày check in và check out trong khoản dateStartSearch <= dateStart <= dateEndSearch or dateStartSearch <= dateEnd <= dateEndSearch
                $or: [
                  {
                    dateStart: { $lte: dateEndSearch },
                    dateEnd: { $gte: dateStartSearch },
                  },
                  { dateStart: { $gte: dateStartSearch, $lte: dateEndSearch } },
                  {
                    dateStart: { $lte: dateStartSearch },
                    dateEnd: { $gte: dateEndSearch },
                  },
                ],
              });
              console.log("transactions", transactions);

              // nếu có transactions thì kiểm tra tiếp tổng số phòng còn lại (phòng chưa đăt) có đủ so với yêu cầu không
              if (transactions.length !== 0) {
                const transactionResult = transactions.filter((tr) => {
                  return tr.rooms.some((rtr) => {
                    console.log(rtr.id.toString() === r._id.toString());
                    return (
                      totalRooms - rtr.roomNumbers.length >= Number(room) &&
                      rtr.id.toString() === r._id.toString()
                    );
                  });
                });
                console.log("transactionsResult", transactionResult);
                if (transactionResult.length !== 0) {
                  return r;
                }
              } else {
                return r;
              }
            }
          })
        );
        console.log("roomMacth", roomMacth);

        if (roomMacth.filter(Boolean).length !== 0) {
          return hotel;
        }
      })
    );

    // Trả về danh sách khách sạn thỏa mãn
    console.log(filteredHotels.filter(Boolean));
    res.json(filteredHotels.filter(Boolean));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
