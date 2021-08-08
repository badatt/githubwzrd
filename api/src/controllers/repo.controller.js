const { gh } = require('../config/github-graphql-client');

/**
 * Get logged in user info
 * @public
 */
exports.all = async (req, res, next) => {
  const { org, gitToken } = req.user;
  const {
    organization: {
      repositories: { nodes },
    },
  } = await gh(gitToken)(
    `
    query allRepos($login: String!){
      organization(login:$login) {
        repositories(first:100) {
          nodes {
            name
            url
            description
            isArchived
          }
        }
      }
    }
  `,
    {
      login: org,
    },
  );
  res.send(nodes.filter((n) => !n.isArchived));
};
