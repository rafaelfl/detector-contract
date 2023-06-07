import { Router } from 'express';

import controller from '../../controllers/suggestion/SuggestionController';

const router = Router();

/* POST scan filename */
router.post('/suggestion', controller.suggestion());

export default router;
