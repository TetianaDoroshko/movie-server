const { Movie } = require("../../models");
const { findOne } = require("../../models/user");
const { createError } = require("../../utils");

const remove = async (req, res, next) => {
  const { _id } = req.user;

  const { movieId } = req.params;

  let movie = await Movie.findOne({ _id: movieId });

  if (!movie) {
    createError(404, "Not found");
  }

  if (String(movie.owner) !== String(_id)) {
    createError(403, "It is not allowed to delete");
  }

  movie = await Movie.findOneAndRemove(
    { _id: movieId },
    {
      new: true,
      projection: { owner: 0, createdAt: 0, updatedAt: 0 },
    }
  );

  res.status(200).json(movie);
};

module.exports = remove;
