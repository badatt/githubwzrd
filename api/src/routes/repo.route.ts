import { Router } from 'express';
import { all } from '../controllers/repo.controller';
import { authorize } from '../middlewares/auth';

const router = Router();

/**
 * GET /_meta
 */
router.route('/_meta').get((req, res) => res.send({ status: 'ok' }));

router.route('/').get(authorize(), all);

export default router;
