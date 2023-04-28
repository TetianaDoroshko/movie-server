const Joi = require("joi");

module.exports = createSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.array().required(),
  releaseDate: Joi.date().max("now").required(),
});
