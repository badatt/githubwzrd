import { Router } from 'express';
import { all, saveUserRepos } from '../controllers/repo.controller';
import { authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validator';
import { UserRepos } from '../models/repo/UserRepos';

const router = Router();

/**
 * GET /_meta
 */
router.route('/_meta').get((req, res) => res.send({ status: '👍' }));

router.route('/').get(authorize(), all).post(authorize(), validate(UserRepos), saveUserRepos);

export default router;
