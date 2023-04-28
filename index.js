require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./src/routes/auth");
const moviesRouter = require("./src/routes/movies");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "API works" });
});

app.use("/api/auth", authRouter);
app.use("/api/movies", moviesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Database has successfuly connected on port ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(`Database connection has failed. ${error.message}`);
    process.exit(1);
  });
