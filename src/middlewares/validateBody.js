const Joi = require("joi");
const { transformDate } = require("../utils");

const validateBody = (schema) => {
  return (req, res, next) => {
    const body = req.body.releaseDate
      ? {
          ...req.body,
          releaseDate: transformDate(req.body.releaseDate),
        }
      : req.body;

    const { error } = schema.validate(body);

    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validateBody;
