import { Request, Response, NextFunction } from 'express';
import { gh } from '../config/github-graphql-client';
import { UserRepos } from '../models/repo/UserRepos';

/**
 * Get logged in user info
 * @public
 */
export const all = async (req: Request, res: Response, next: NextFunction) => {
  const { org, gitToken } = req.currentUser;
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
  res.send(nodes.filter((n: any) => !n.isArchived));
};

export const saveUserRepos = async (req: Request, res: Response, next: NextFunction) => {
  const userRepos = req.body as UserRepos;
  res.send(userRepos);
};
