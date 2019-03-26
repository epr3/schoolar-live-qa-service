import { Router } from 'express';
import * as yup from 'yup';
import validationMiddleware from '../middlewares/validationMiddleware';
import sessionController from '../controllers/session';

const router = Router();

const sessionSchema = yup.object().shape({
  eventId: yup.string().required()
});

router.get('/sessions', sessionController.getSessions);
router.get('/sessions/:id', sessionController.getSession);
router.post(
  '/sessions',
  validationMiddleware(sessionSchema),
  sessionController.postSession
);
router.put(
  '/sessions/:id',
  validationMiddleware(sessionSchema),
  sessionController.updateSession
);
router.delete('/sessions/:id', sessionController.removeSession);

export default router;
