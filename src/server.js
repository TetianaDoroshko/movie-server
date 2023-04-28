const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const moviesRouter = require("./routes/movies");
const { checkAuth } = require("./middlewares");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "API works" });
});

app.use("/api/auth", authRouter);
app.use("/api/movies", checkAuth, moviesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
