import { Response } from 'express';
import { messages } from './constants';
import { Error } from './exception';

const { APP_SERVER_ERROR } = messages;

export default class ResponseHelper {
  static send(res: Response, data: unknown, code = 200) {
    return res.status(code).json(data);
  }

  /*
   * Send http error response
   */
  static sendError(res: Response, error: Error) {
    const { statusCode = 500, message: errorMessage } = error;
    const message = statusCode === 500 ? APP_SERVER_ERROR : errorMessage;

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}
