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
  const additionalParams: any = {};

  if (appRequest.after) {
    additionalParams.aft = appRequest.after;
    additionalParams.fir = 100;
  } else if (appRequest.before) {
    additionalParams.bef = appRequest.before;
    additionalParams.las = 100;
  } else {
    additionalParams.fir = 100;
  }

  const query = `
    query allRepos($login: String!, $aft: String, $bef: String, $fir: Int, $las: Int){
      organization(login:$login) {
        repositories(last:$las, before:$bef, first: $fir, after:$aft, orderBy: { field: NAME, direction: ASC}) {
          pageInfo {
            hasNextPage
            startCursor
            endCursor
            hasPreviousPage 
          }
          nodes {
            id
            name
            url
            description
            isArchived
          }
        }
      }
      rateLimit {
        limit
        cost
        remaining
        resetAt
      }
    }
  `;
  const {
    organization: {
      repositories: { nodes, pageInfo },
    },
    rateLimit
  } = await gh(gitToken)(query, {
    login: org,
    ...additionalParams,
  });
  res.send({ data: nodes.filter((n: any) => !n.isArchived), pageInfo, rateLimit });
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
