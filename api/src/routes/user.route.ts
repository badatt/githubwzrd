import { Router, Request, Response } from 'express';
import { me, session } from '../controllers/user.controller';
import { authorize } from '../middlewares/auth';

const router = Router();

/**
 * GET /_meta
 */
router.route('/_meta').get((req: Request, res: Response) => res.send({ status: '👍' }));

router.route('/').get(authorize(), me);

router.route('/session').get(authorize(), session);

export default router;
