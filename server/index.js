require("dotenv").config();
const express = require("express");
// port
const port = process.env.PORT || 4000;
const cors = require("cors");
// user model
const User = require("./models/user.model");
const { model } = require("mongoose");
// mongoose
require("./config/database");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// read
app.get("/", async (req, res) => {
  const data = await User.find({});
  res.json({ success: true, data: data });
});

// create data
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new User(req.body);
  await data.save();
  res.status(200).json({
    success: true,
    message: "Data is created",
    data: data,
  });
});

// update data
app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  console.log(rest);
  const data = await User.updateOne({ _id: _id }, rest);
  res.send({
    success: true,
    message: "Data successfully updated",
    data: data,
  });
});

// delete data
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await User.deleteOne({ _id: id });
  res.status(202).send({
    success: true,
    message: "Data deleted successfully",
    data: data,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// route not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "resource is not found",
  });
});

// server not working
app.use((req, res, next) => {
  res.status(500).json({
    message: "Server is not working",
  });
});
