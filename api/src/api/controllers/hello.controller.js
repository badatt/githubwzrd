/**
 * Get logged in user info
 * @public
 */
exports.hello = (req, res) => res.json(req.user);
