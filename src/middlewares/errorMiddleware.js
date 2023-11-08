function errorMiddleware(err, req, res, next) {
  if (err) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }

  next(err);
}