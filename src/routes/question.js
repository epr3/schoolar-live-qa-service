const { Router } = require('express');
const yup = require('yup');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const questionController = require('../controllers/question');

const router = Router();

const questionSchema = yup.object().shape({
  description: yup.string().required(),
  sessionId: yup.string().required(),
  userId: yup.string().required()
});

router.get('/questions', jwtMiddleware, questionController.getQuestions);
router.get('/questions/:id', jwtMiddleware, questionController.getQuestion);
router.post(
  '/questions',
  validationMiddleware(questionSchema),
  jwtMiddleware,
  questionController.postQuestion
);
router.put(
  '/questions/:id',
  validationMiddleware(questionSchema),
  jwtMiddleware,
  questionController.updateQuestion
);
router.delete(
  '/questions/:id',
  jwtMiddleware,
  questionController.removeQuestion
);

module.exports = router;
