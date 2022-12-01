const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  console.log("hello" + error);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode === 200 ? 500 : err.statusCode;

  console.log(err.statusCode);
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.MOD_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
