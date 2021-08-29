import { Request, Response, NextFunction } from 'express';
import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { gh } from '../config/github-graphql-client';
import { UserRepos } from '../models/repo/UserRepos';
import { db } from '../config/aws';
import User from '../db/User';
import APIError from '../errors/APIError';
import AppRequest from 'models/AppRequest';

/**
 * Get logged in user info
 * @public
 */
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const appRequest = req.body as AppRequest;
  const { org, gitToken } = req.currentUser;

  let cursor = appRequest.cursor && `after: "${appRequest.cursor}",`;
  const query = `
    query allRepos($login: String!){
      organization(login:$login) {
        repositories(first:100, ${cursor || ''} orderBy: { field: NAME, direction: ASC}) {
          pageInfo {
            hasNextPage
            startCursor
            endCursor
            hasPreviousPage 
          }
          nodes {
            name
            url
            description
            isArchived
          }
        }
      }
    }
  `;
  const {
    organization: {
      repositories: { nodes, pageInfo },
    },
  } = await gh(gitToken)(query, {
    login: org,
  });
  res.send({ data: nodes.filter((n: any) => !n.isArchived), pageInfo });
};

export const postUserRepos = async (req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.currentUser;
  const userRepos = req.body as UserRepos;
  const userItem = await db.tryGetAsync(new User(), { id: currentUser.userId, org: currentUser.org });
  if (!userItem) return next(new APIError({ message: 'User not found', status: NOT_FOUND }));
  userItem.repos = userRepos.repos;
  await db.mapper.update(userItem);
  res.status(NO_CONTENT).send();
};
