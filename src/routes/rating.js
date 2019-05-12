const { Router } = require('express');
const yup = require('yup');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const ratingController = require('../controllers/rating');

const router = Router();

const ratingSchema = yup.object().shape({
  questionId: yup.string().required(),
  userId: yup.string().required()
});

router.get('/ratings', jwtMiddleware, ratingController.getRatings);
router.get('/ratings/:id', jwtMiddleware, ratingController.getRating);
router.post(
  '/ratings',
  validationMiddleware(ratingSchema),
  jwtMiddleware,
  ratingController.postRating
);
router.put(
  '/ratings/:id',
  validationMiddleware(ratingSchema),
  jwtMiddleware,
  ratingController.updateRating
);
router.delete('/ratings/:id', jwtMiddleware, ratingController.removeRating);

module.exports = router;
