import { Router } from 'express';
import { authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validator';
import { getAll, postUserRepos } from '../controllers/repo.controller';
import { UserRepos } from '../models/repo/UserRepos';

const router = Router();

/**
 * GET /_meta
 */
router.route('/_meta').get((req, res) => res.send({ status: '👍' }));

router.route('/').get(authorize(), getAll).post(authorize(), validate(UserRepos), postUserRepos);

export default router;
