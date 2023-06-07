import { Router } from 'express';

import controller from '../../controllers/suggestion/SuggestionController';

const router = Router();

/* POST suggestion */
router.post('/suggestion', controller.suggestion());

export default router;
