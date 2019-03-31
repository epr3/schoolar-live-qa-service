import { Router } from 'express';
import * as yup from 'yup';
import validationMiddleware from '../middlewares/validationMiddleware';
import ratingController from '../controllers/rating';

const router = Router();

const ratingSchema = yup.object().shape({
  studentId: yup.string().required()
});

router.get('/ratings', ratingController.getRatings);
router.get('/ratings/:id', ratingController.getRating);
router.post(
  '/ratings',
  validationMiddleware(ratingSchema),
  ratingController.postRating
);
router.put(
  '/ratings/:id',
  validationMiddleware(ratingSchema),
  ratingController.updateRating
);
router.delete('/ratings/:id', ratingController.removeRating);

export default router;
