require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_CRUD_URL =
  process.env.MONGO_CRUD_URL || "mongodb://127.0.0.1:27017/CRUDtest";
mongoose
  .connect(MONGO_CRUD_URL)
  .then(() => console.log("DB is connected"))
  .catch((error) => {
    console.log(error);
    console.log(error.message);
    process.exit(1);
  });
