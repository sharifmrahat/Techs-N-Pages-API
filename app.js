const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const userRoute = require("./routes/user.route");
const bagRoute = require("./routes/bag.route");
const reviewRoute = require("./routes/review.route");

app.get("/", (req, res) => {
  res.send("Techs N Pages Server is running");
});

app.use("/api/v1/user", userRoute)
app.use("/api/v1/bag", bagRoute)
app.use("/api/v1/review", reviewRoute)

app.all("*", (req, res) => {
  res.send({ success: false, error:  `Route ${req.url} is not found`  });
});

module.exports = app;
