import { Router, Request, Response } from 'express';
import { requestHandler } from '../config/handler';
import { me, signUp, session } from '../controllers/user.controller';
import { authorize } from '../middlewares/auth';

const router = Router();

/**
 * GET /_meta
 */
router.route('/_meta').get((req: Request, res: Response) => res.send({ status: '👍' }));

router.route('/').get(authorize(), requestHandler(me));

router.route('/signup').post(authorize(), requestHandler(signUp));

router.route('/session').get(authorize(), requestHandler(session));

export default router;
