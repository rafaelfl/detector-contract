import { Request, Response, NextFunction, RequestHandler } from 'express';
import ResponseHelper from '../helpers/responseHelper';
import { BaseService } from '../services/BaseService';

const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };
};

class BaseController {
  protected service: BaseService;
  protected asyncWrapper: (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>,
  ) => RequestHandler;
  protected sendResponse: (res: Response, data: unknown, code?: number) => Response;

  constructor(service: BaseService) {
    this.service = service;
    this.asyncWrapper = asyncWrapper;
    this.sendResponse = ResponseHelper.send;
  }
}

export default BaseController;
