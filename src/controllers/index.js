const signup = require("./auth/signup");
const login = require("./auth/login");
const current = require("./auth/current");
const logout = require("./auth/logout");

const add = require("./movies/add");
const getAll = require("./movies/getAll");
const getById = require("./movies/getById");
const update = require("./movies/update");
const remove = require("./movies/remove");

module.exports = {
  signup,
  login,
  current,
  logout,
  add,
  getAll,
  getById,
  update,
  remove,
};
