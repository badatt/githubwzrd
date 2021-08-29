import { Router, Request, Response } from 'express';
import { me, signUp, session } from '../controllers/user.controller';
import { authorize } from '../middlewares/auth';

const router = Router();

/**
 * GET /_meta
 */
router.route('/_meta').get((req: Request, res: Response) => res.send({ status: '👍' }));

router.route('/').get(authorize(), me);

router.route('/signup').post(authorize(), signUp);

router.route('/session').get(authorize(), session);

export default router;
