const errorHandler = (err, req, res, next) => {
  const stateCode = res.statusCode ? res.statusCode : 500;

  res.status(stateCode);

  res.json({
    message: Error.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
module.exports = {
  errorHandler,
};
