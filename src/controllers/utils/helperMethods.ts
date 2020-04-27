import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
import { validationResult } from "express-validator";
import HttpError from "../../models/HttpError/HttpError";

export const checkNotFound = (
  entityName: string,
  entity: Document | null,
  id: string
) => {
  if (!entity) {
    throw new HttpError(`Could not find ${entityName} with id ${id}`, 404);
  }
};

export const validate = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid request input", 400);
  }
};

export const errorWrapper = (func: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await func(req, res, next);
    } catch (error) {
      console.error(error);
      if (!(error instanceof HttpError)) {
        error = new HttpError("Internal Server Error", 500);
      }
      return next(error);
    }
  };
};
