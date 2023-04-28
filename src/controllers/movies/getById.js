const { Movie } = require("../../models");
const { createError } = require("../../utils");

const getById = async (req, res, next) => {
  const { movieId } = req.params;

  const movie = await Movie.findOne(
    { _id: movieId },
    { owner: 0, createdAt: 0, updatedAt: 0 }
  );

  if (!movie) {
    createError(404, "Not found");
  }

  res.status(200).json(movie);
};

module.exports = getById;
