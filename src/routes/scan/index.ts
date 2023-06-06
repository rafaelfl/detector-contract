import { Router } from 'express';
import ResponseHelper from '../../helpers/responseHelper';

const router = Router();

/* POST create user account. */
router.post('/scan', (req, res) => {
  return ResponseHelper.send(res, { test: 1 });
});

export default router;
