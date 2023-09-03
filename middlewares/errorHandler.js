const AppError = require("../utils/appError");

const handleMongooseValidationError = (err) => {
  const message = err._message;
  const fields = Object.keys(err.errors);

  const validations = {};

  fields.forEach((field) => (validations[field] = err.errors[field].message));

  const error = new AppError(400, { message, validations });
  return error;
};

const handleMongooseDuplicateError = (err) => {
  const key = Object.keys(err.keyPattern);
  const value = err.keyValue[key];

  const error = new AppError(400, `${key} already exits`);
  console.log(error);
  return error;
};

const errorHandler = (err, req, res, next) => {
  let error;

  if (err.name === "ValidationError")
    error = handleMongooseValidationError(err, res);
  else if (err.code === 11000) error = handleMongooseDuplicateError(err);
  else if (err.isOperational) error = err;
  else error = new AppError(500, "Something went wrong");

  res
    .status(error.statusCode)
    .json({ status: error.status, message: error.message });
};

module.exports = errorHandler;
