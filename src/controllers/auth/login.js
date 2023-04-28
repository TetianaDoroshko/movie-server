const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { createError } = require("../../utils");

const secret = process.env.SECRET_JWT;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    createError(401, "Email or password is incorrect");
  }

  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    createError(401, "Email or password is incorrect");
  }

  const token = jwt.sign({ _id: user._id }, secret, { expiresIn: "1d" });

  user.token = token;

  await user.save();

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
    },
    token: user.token,
  });
};

module.exports = login;
