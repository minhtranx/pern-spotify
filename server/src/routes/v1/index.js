import { Router } from 'express';
import userRoute from './user.route';
import docsRoute from './docs.route';

const router = new Router();
router.use('/users', userRoute);
router.use('/docs', docsRoute);

export default router;
