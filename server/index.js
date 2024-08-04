const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const criminalRoutes = require("./routes/criminalRoutes");
const reportRoutes = require("./routes/reportRoutes.js");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/criminal", criminalRoutes);
app.use("/report", reportRoutes);

// mongoose
//   .connect("mongodb://0.0.0.0:27017/Crime-Management")
//   .then(() => {
//     console.log("connected to db");
//   })
//   .catch((e) => {
//     console.log("Error", e);
//   });


app.listen(7000, () => {
  console.log("server started");
});
