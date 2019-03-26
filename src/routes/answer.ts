import { Router } from 'express';
import * as yup from 'yup';
import validationMiddleware from '../middlewares/validationMiddleware';
import answerController from '../controllers/answer';

const router = Router();

const answerSchema = yup.object().shape({
  description: yup.string().required(),
  questionId: yup.string().required()
});

router.get('/answers', answerController.getAnswers);
router.get('/answers/:id', answerController.getAnswer);
router.post(
  '/answers',
  validationMiddleware(answerSchema),
  answerController.postAnswer
);
router.put(
  '/answers/:id',
  validationMiddleware(answerSchema),
  answerController.updateAnswer
);
router.delete('/answers/:id', answerController.removeAnswer);

export default router;
