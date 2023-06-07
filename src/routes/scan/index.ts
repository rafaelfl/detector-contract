import { Router } from 'express';

import controller from '../../controllers/scan/ScanController';

const router = Router();

/* POST scan */
router.post('/scan', controller.scan());

export default router;
