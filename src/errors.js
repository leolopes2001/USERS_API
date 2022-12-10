class AppError extends Error {
  constructor(message, statusCode = 400) {
    super();
    this.message = { message };
    this.statusCode = statusCode;
  }
}

const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.satusCode).json(error.message);
  }

  console.log(error);

  return response.status(500).json({
    message: "Internal server error",
  });
};

export { AppError, errorHandler };
