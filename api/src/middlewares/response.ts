import sortJson, { VisitOptions } from 'sort-json';
import { Request, Response, NextFunction } from 'express';
import mung from 'express-mung';

export const sort = () =>
  mung.json((body: any, req: Request, res: Response) => {
    const options: VisitOptions = { ignoreCase: true };
    return sortJson(body, options);
  });
