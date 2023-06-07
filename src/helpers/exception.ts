import { NextFunction, Request, Response } from 'express';
import ResponseHelper from './responseHelper';

export interface Error {
  statusCode?: number;
  message?: string;
  errors?: Array<Error>;
}

export class Exception {
  /*
   * A middleware for handling exception. All errors are forwarded to this function
   */
  static handleError() {
    return (error: Error, req: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) {
        return next(error);
      }

      return ResponseHelper.sendError(res, error);
    };
  }
}
