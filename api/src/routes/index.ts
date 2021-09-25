import { static as Docs, Router } from 'express';
import repoRoutes from './repo.route';
import pullRoutes from './pulls.route';
import userRoutes from './user.route';

const router = Router();

router.use('/docs', Docs('docs'));
router.use('/repos', repoRoutes);
router.use('/pulls', pullRoutes);
router.use('/me', userRoutes);

export default router;
