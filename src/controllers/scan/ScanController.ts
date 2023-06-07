import ScanService from '../../services/scan/ScanService';
import BaseController from '../BaseController';

class ScanController extends BaseController {
  scan() {
    return this.asyncWrapper(async (req, res) => {
      const payload = await ScanService.getResult({
        sourceCode: (req.body.sourceCode ?? '') as string,
      });

      this.sendResponse(res, payload);
    });
  }
}

const controller = new ScanController();
export default controller;
