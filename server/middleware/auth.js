const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.authentication = catchAsyncErrors(async (req, res, next) => {
  if (req.user) {
    const userToken = jwt.verify(req.user, process.env.ACCESS_TOKEN_KEY);
    req.user = userToken;
    next();
    return;
  }

  if (!req.header("x-auth-token"))
    return next(new ErrorHandler("token is not provided", 401));

  const decoded = jwt.verify(
    req.header("x-auth-token"),
    process.env.ACCESS_TOKEN_KEY
  );
  req.user = decoded;
  next();
});
