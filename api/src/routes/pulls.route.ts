import { Router } from 'express';
import { requestHandler } from '../config/handler';
import { authorize } from '../middlewares/auth';
import { relatedPulls } from '../controllers/pulls.controller';

const router = Router();

router.route('/_meta').get((req, res) => res.send({ status: '👍' }));

router.route('/').get(authorize(), requestHandler(relatedPulls));

export default router;
