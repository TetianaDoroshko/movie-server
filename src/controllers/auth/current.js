const getCurrentUser = async (req, res, next) => {
  const { username, email } = req.user;
  res.status(201).json({
    user: {
      username,
      email,
    },
  });
};
module.exports = getCurrentUser;
