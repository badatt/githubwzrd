import { Request, Response, NextFunction } from 'express';
import { NOT_FOUND } from 'http-status';
import { gh } from '../config/github-graphql-client';
import { UserRepos } from '../models/repo/UserRepos';
import { db } from '../config/aws';
import User from '../db/User';
import APIError from '../errors/APIError';

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
  const currentUser = req.currentUser;
  const userRepos = req.body as UserRepos;
  const userItem = await db.tryGetAsync(new User(), { id: currentUser.userId, org: currentUser.org });
  if (!userItem) return next(new APIError({ message: 'User not found', status: NOT_FOUND }));
  userItem.repos = userRepos.repos;
  await db.mapper.update(userItem);
  res.status(204).send();
};
