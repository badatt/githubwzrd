import { graphql } from '@octokit/graphql';

export const gh = (token: string) => {
  return graphql.defaults({
    headers: {
      authorization: `token ${token.trim()}`,
    },
  });
};
