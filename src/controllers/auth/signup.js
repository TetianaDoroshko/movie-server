const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { createError } = require("../../utils");

const secret = process.env.SECRET_JWT;

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    createError(409, "This email already exists");
  }

  const hashedPass = await bcrypt.hash(password, await bcrypt.genSalt(10));

  let newUser = await User.create({ username, email, password: hashedPass });

  const token = jwt.sign({ _id: newUser._id }, secret, { expiresIn: "1d" });

  newUser.token = token;

  await newUser.save();

  res.status(201).json({
    user: {
      username: newUser.username,
      email: newUser.email,
    },
    token: newUser.token,
  });
};

module.exports = signup;
