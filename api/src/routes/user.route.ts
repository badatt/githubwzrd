import { Router, Request, Response } from 'express';
import { me } from '../controllers/user.controller';
import { authorize } from '../middlewares/auth';

const router = Router();

/**
 * GET /_meta
 */
router.route('/_meta').get((req: Request, res: Response) => res.send({ status: '👍' }));

router.route('/').get(authorize(), me);

export default router;
