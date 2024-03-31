const express = require("express");
const router = express.Router();
const hotelsCotrollers = require("../controller/hotelController");
const { validateToken } = require('../middlewares/validateTokenHandler');


router.use(validateToken)

//get hotel by address
router.get("/listHotel", hotelsCotrollers.getHotels);

//post search
router.get("/search", hotelsCotrollers.getHotelSearch);

//get details hotel
router.get("/detail", hotelsCotrollers.getDetail);

module.exports = router;
