import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status';
import { validate as classValidate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import RequestValidationError, { IRequestValidationError } from '../errors/RequestValidationError';

export const validate = (dtoClass: any) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const model: any = plainToClass(dtoClass, req.body);
    classValidate(model, { skipMissingProperties: true }).then((errors) => {
      const rve: IRequestValidationError = {
        message: 'InvalidRequestObject',
        status: BAD_REQUEST,
        errors: [],
      };
      if (errors.length > 0) {
        errors.forEach((ei) => {
          Object.keys(ei.constraints).forEach((c) => {
            rve.errors.push({
              type: c,
              property: ei.property,
              message: ei.constraints[c],
            });
          });
        });
        next(new RequestValidationError(rve));
      } else {
        req.body = model;
        next();
      }
    });
  };
};
