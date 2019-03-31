import { Router } from 'express';
import * as yup from 'yup';
import validationMiddleware from '../middlewares/validationMiddleware';
import questionController from '../controllers/question';

const router = Router();

const questionSchema = yup.object().shape({
  description: yup.string().required(),
  questionId: yup.string().required()
});

router.get('/questions', questionController.getQuestions);
router.get('/questions/:id', questionController.getQuestion);
router.post(
  '/questions',
  validationMiddleware(questionSchema),
  questionController.postQuestion
);
router.put(
  '/questions/:id',
  validationMiddleware(questionSchema),
  questionController.updateQuestion
);
router.delete('/questions/:id', questionController.removeQuestion);

export default router;
