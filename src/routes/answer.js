const { Router } = require('express');
const yup = require('yup');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const answerController = require('../controllers/answer');

const router = Router();

const answerSchema = yup.object().shape({
  description: yup.string().required(),
  questionId: yup.string().required()
});

router.get('/answers', jwtMiddleware, answerController.getAnswers);
router.get('/answers/:id', jwtMiddleware, answerController.getAnswer);
router.post(
  '/answers',
  validationMiddleware(answerSchema),
  jwtMiddleware,
  answerController.postAnswer
);
router.put(
  '/answers/:id',
  validationMiddleware(answerSchema),
  jwtMiddleware,
  answerController.updateAnswer
);
router.delete('/answers/:id', jwtMiddleware, answerController.removeAnswer);

module.exports = router;
