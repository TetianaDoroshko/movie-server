const { isValidObjectId } = require("mongoose");
const { createError } = require("../utils");

const isValidId = (req, res, next) => {
  const { movieId } = req.params;
  const result = isValidObjectId(movieId);
  if (!result) {
    next(createError(400, "Bad request, invalid id"));
  }
  next();
};

module.exports = isValidId;
