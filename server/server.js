const cors = require("cors");
const cookieSession = require("cookie-session");
if (process.env.NODE_ENV != "production")
  require("dotenv").config({ path: "./.env" });
const express = require("express");
const passport = require("passport");
const path = require("path");

const error = require("./middleware/error");
const connection = require("./database/db");
const productsRouter = require("./routes/products");
const reviewsRouter = require("./routes/reviews");
const users = require("./routes/users");

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.CLIENT_URL + "/"],
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

app.use(
  cookieSession({
    keys: [process.env.ACCESS_TOKEN_KEY],
    name: "session",
    secure: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./passport");

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use("/api/products", productsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/users", users);

app.use(error);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("./client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
  });
}

const server = app.listen(process.env.PORT || 5000);

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server for Handling uncaught Exception`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down server for ${err.message}`);
  console.log(`Shutting down the server due to Unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
connection();

// in future i'll implement winston logger
