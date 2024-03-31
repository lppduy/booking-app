const express = require("express");
const cors = require("cors");
const app = express();

const { errorHandler } = require('./middlewares/errorHandler');
const authRoutes = require("./router/authRoutes");
const hotelRoutes = require("./router/hotelRoutes");


require("dotenv").config();
const connectDb = require('./config/dbConnection');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


connectDb();

app.use("/auth", authRoutes);
app.use("/hotels", hotelRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
