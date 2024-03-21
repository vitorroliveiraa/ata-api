import { Router } from 'express';

import ataRoutes from './ata.routes.js';

const router = Router();

router.use('/minutes', ataRoutes);

export default router;