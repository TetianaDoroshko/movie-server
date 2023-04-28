const Joi = require("joi");

module.exports = updateSchema = Joi.object({
  title: Joi.string(),
  director: Joi.array(),
  releaseDate: Joi.date().max("now"),
});
