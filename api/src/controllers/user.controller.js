exports.me = async (req, res, next) => {
  res.send(req.user);
};
