const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const userRoute = require("./routes/user.route");

app.get("/", (req, res) => {
  res.send("Techs N Pages Server is running");
});

app.use("/api/v1/user", userRoute)

app.all("*", (req, res) => {
  res.send({ success: false, error:  `Route ${req.url} is not found`  });
});

module.exports = app;
