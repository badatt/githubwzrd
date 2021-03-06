import { Request, Response, NextFunction } from 'express';
import { NOT_FOUND } from 'http-status';
import { gh } from '../config/github-graphql-client';
import { db } from '../config/aws';
import APIError from '../errors/APIError';
import User from '../db/User';

export interface IPull {
  title: string;
  url: string;
  assignedToMe?: boolean;
  reviewRequiredByMe?: boolean;
  createdByMe?: boolean;
}

export interface IRelatedPull {
  repoName: string;
  repoUrl: string;
  anyAssignedToMe?: boolean;
  anyReviewRequiredByMe?: boolean;
  anyCreatedByMe?: boolean;
  pulls?: IPull[];
}

export const relatedPulls = async (req: Request, res: Response, next: NextFunction) => {
  const { org, gitToken, userId, username } = req.currentUser;
  const userItem = await db.tryGetAsync(new User(), { id: userId, org: org });
  if (!userItem.repos || userItem.repos.length === 0)
    throw new APIError({ message: 'No repos found', status: NOT_FOUND });

  // TODO change query to pull only OPEN state pulls
  const queryTemplate = `
    query relatedPulls($org: String!, $repo: String!) {
      organization(login:$org) {
        repository(name: $repo) {
          name
          url
          pullRequests(first:100, orderBy: {field: CREATED_AT, direction: DESC} ) {
            totalCount
            nodes {
              title
              url
              author{
                login
              }
              reviewRequests(first:100) {
                nodes{
                  requestedReviewer{
                  ... on Actor {
                      login
                    }
                  }
                }
              }
              assignees(first:100) {
                nodes {
                  login
                }
              }
            }
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

  const response: IRelatedPull[] = [];
  let rl;

  for (const repo of userItem.repos) {
    const {
      organization: { repository },
      rateLimit,
    } = await gh(gitToken)(queryTemplate, { org, repo });
    rl = rateLimit;
    const relatedPull: IRelatedPull = {
      repoName: repository.name,
      repoUrl: repository.url,
      pulls: [],
    };
    for (const p of repository.pullRequests.nodes) {
      const pull: IPull = { title: p.title, url: p.url };
      if (p.author.login === username) {
        relatedPull.anyCreatedByMe = true;
        pull.createdByMe = true;
      }
      if (p.reviewRequests.nodes.some((n: any) => n.requestedReviewer.login === username)) {
        relatedPull.anyReviewRequiredByMe = true;
        pull.reviewRequiredByMe = true;
      }
      if (p.assignees.nodes.some((n: any) => n.login === username)) {
        relatedPull.anyAssignedToMe = true;
        pull.assignedToMe = true;
      }
      relatedPull.pulls.push(pull);
    }
    response.push(relatedPull);
  }

  res.send({ data: response, rateLimit: rl });
};
