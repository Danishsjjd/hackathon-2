const mongoose = require("mongoose");

module.exports = function connection() {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then((data) => {
      console.log(`mongodb is connected with server: ${data.connection.host}`);
    })
    .catch((err) => debug(err));
};
