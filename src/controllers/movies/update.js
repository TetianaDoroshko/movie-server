const { Movie } = require("../../models");
const { createError } = require("../../utils");

const update = async (req, res, next) => {
  const { _id } = req.user;

  const { movieId } = req.params;

  let movie = await Movie.findOne({ _id: movieId });

  if (!movie) {
    createError(404, "Not found");
  }
  if (String(movie.owner) !== String(_id)) {
    createError(403, "It is not allowed to update");
  }

  movie = await Movie.findOneAndUpdate({ _id: movieId }, req.body, {
    new: true,
    projection: { owner: 0, createdAt: 0, updatedAt: 0 },
  });

  res.status(200).json(movie);
};

module.exports = update;
