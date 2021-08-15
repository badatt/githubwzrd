import { Request, Response, NextFunction } from 'express';
import { NOT_FOUND } from 'http-status';
import { db } from '../config/aws';
import { gh } from '../config/github-graphql-client';
import User from '../db/User';
import APIError from '../errors/APIError';

export const session = async (req: Request, res: Response, next: NextFunction) => {
  res.send(req.currentUser);
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.currentUser;
  const userItem = await db.tryGetAsync(new User(), { id: currentUser.userId, org: currentUser.org });
  if (!userItem) return next(new APIError({ message: 'User not found', status: NOT_FOUND }));
  const { username, gitToken } = currentUser;
  const { user } = await gh(gitToken)(
    `
    query getUser($login: String!) {
      user(login: $login) {
        avatarUrl
        name
        url
      }
    }
  `,
    {
      login: username,
    },
  );
  const response = { ...user, ...userItem };
  res.send(response);
};
