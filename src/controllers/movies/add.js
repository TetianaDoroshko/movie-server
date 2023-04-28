const { Movie } = require("../../models");

const add = async (req, res, next) => {
  const { _id: userId } = req.user;
  const movie = await Movie.create({ ...req.body, owner: userId });
  const { title, director, releaseDate, _id } = movie;
  res.status(201).json({ title, director, releaseDate, _id });
};

module.exports = add;
