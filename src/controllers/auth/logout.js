const { User } = require("../../models");
const { createError } = require("../../utils");

const logout = async (req, res, next) => {
  const { _id } = req.user;
  const updUser = await User.findByIdAndUpdate(
    _id,
    { token: null },
    { new: true }
  );
  if (!updUser) {
    createError(401, "Not authorized");
  }
  res.sendStatus(204);
};

module.exports = logout;
