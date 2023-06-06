import { BaseService } from '../../services/BaseService';
import ScanService from '../../services/scan/ScanService';
import BaseController from '../BaseController';

class ScanController extends BaseController {
  constructor(service: BaseService) {
    super(service);
  }

  scan() {
    return this.asyncWrapper(async (req, res) => {
      const payload = await ScanService.getResult({
        sourceCode: (req.body.sourceCode ?? '') as string,
      });

      this.sendResponse(res, payload);
    });
  }
}

const controller = new ScanController(ScanService);
export default controller;
