const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");
const errorHandler = require("./middleware/errorHandler");

const URI = `${process.env.DATABASE_PROTOCOL}://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}/${process.env.DATABASE_NAME}`;

mongoose.connect(URI, () => {
  console.log("Techs N Pages DB is connected");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App in running on the port: ${port}`);
});

app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
