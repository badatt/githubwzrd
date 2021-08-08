const { graphql } = require('@octokit/graphql');

exports.gh = function (token) {
  return graphql.defaults({
    headers: {
      authorization: `token ${token.trim()}`,
    },
  });
};
