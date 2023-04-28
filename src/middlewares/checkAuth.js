const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { createError } = require("../utils");

const secret = process.env.SECRET_JWT;

const checkAuth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      createError(401, "Not authorized");
    }

    const { _id } = jwt.verify(token, secret);

    const user = await User.findOne({ _id });

    if (!user || user.token !== token) {
      createError(401, "Not authorized");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      // error of jwt verifying
      error.status = 401;
      error.message = "Not authorized";
    }
    next(error);
  }
};

module.exports = checkAuth;
