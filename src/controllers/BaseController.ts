import { Request, Response, NextFunction, RequestHandler } from 'express';
import ResponseHelper from '../helpers/responseHelper';

const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };
};

class BaseController {
  protected asyncWrapper: (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>,
  ) => RequestHandler;
  protected sendResponse: (res: Response, data: unknown, code?: number) => Response;

  constructor() {
    this.asyncWrapper = asyncWrapper;
    this.sendResponse = ResponseHelper.send;
  }
}

export default BaseController;
