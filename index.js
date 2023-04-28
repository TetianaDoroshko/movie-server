require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/server");

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
