class AppError {
  constructor(statusCode, message) {
    this.isOperational = true;
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.message = message;
  }
}

module.exports = AppError;
