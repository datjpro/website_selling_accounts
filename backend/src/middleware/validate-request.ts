import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodObject, ZodRawShape } from 'zod';
import { ApiError } from '../utils/api-error';

export const validateBody = (schema: ZodObject<ZodRawShape>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(ApiError.badRequest(error.issues.map((issue) => issue.message).join('; ')));
        return;
      }
      next(error as Error);
    }
  };

export const validateParams = (schema: ZodObject<ZodRawShape>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(ApiError.badRequest(error.issues.map((issue) => issue.message).join('; ')));
        return;
      }
      next(error as Error);
    }
  };

export const validateQuery = (schema: ZodObject<ZodRawShape>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(ApiError.badRequest(error.issues.map((issue) => issue.message).join('; ')));
        return;
      }
      next(error as Error);
    }
  };
