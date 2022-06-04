import { Router } from 'express';
import { catchError } from '../../helpers/error.helper';
import Controller from './email.controller';

const router: Router = Router();
const controller = new Controller();

router.post('/send', catchError(controller.send));

export default router;
