const { Octokit } = require('@octokit/rest');

/**
 * Get logged in user info
 * @public
 */
exports.hello = async (req, res, next) => {
  const { org, gitToken } = req.user;
  const octokit = new Octokit({
    auth: gitToken,
  });
  const repos = await octokit.repos.listForOrg({ org });
  res.send(repos.data);
};
