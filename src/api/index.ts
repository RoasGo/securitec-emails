import { Router } from 'express';

import email from './email/email.route';

const router: Router = Router();

router.use('/email', email);

export default router;
