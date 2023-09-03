const { promisify } = require("node:util");

const jwt = require("jsonwebtoken");

const User = require("../../models/userModel");
const asyncHandler = require("../../utils/asyncHandler");
const AppError = require("../../utils/appError");

const signJWTToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  return token;
};

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  const token = signJWTToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 20 * 60 * 60 * 1000),
    httpOnly: true,
  });

  res.status(201).json({
    status: "success",
    token,
    user: { name: user.name, email: user.email },
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError(400, "Please provide email and password"));

  const user = await User.findOne({ email });

  if (!user || !(await user.validatePassword(password)))
    return next(new AppError(401, "Incorrect email or password"));

  const token = signJWTToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 20 * 60 * 60 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    token,
    user: { name: user.name, email: user.email },
  });
});

exports.isLoggedIn = async (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) return next();

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);

    const user = await User.findById(decoded.id).populate("cart");

    if (!user) return next();

    res.locals.user = user;
    req.user = user;
    next();
  } catch {
    return next();
  }
};

exports.isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ").at(1);
  }

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError(401, "You are not logged in. Please log in to get access")
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);

  const user = await User.findById(decoded.id);

  if (!user)
    return next(
      new AppError(
        401,
        "The user with given token does not exit. Please log in again"
      )
    );

  req.user = user;

  next();
});
