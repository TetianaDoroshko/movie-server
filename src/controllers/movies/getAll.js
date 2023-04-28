const { Movie } = require("../../models");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const movies = await Movie.find(
    { owner: _id },
    { owner: 0, createdAt: 0, updatedAt: 0 },
    { limit, skip: (page - 1) * limit }
  );
  res.status(200).json({
    count: movies.length,
    page: +page,
    limit_per_pege: +limit,
    movieCollection: movies,
  });
};

module.exports = getAll;
