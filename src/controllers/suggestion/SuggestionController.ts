import SuggestionService from '../../services/suggestion/SuggestionService';
import BaseController from '../BaseController';

class SuggestionController extends BaseController {
  suggestion() {
    return this.asyncWrapper(async (req, res) => {
      const payload = await SuggestionService.getSuggestion({
        sourceCode: (req.body.sourceCode ?? '') as string,
      });

      this.sendResponse(res, payload);
    });
  }
}

const controller = new SuggestionController();
export default controller;
