import { getRepository } from 'typeorm';
import { Rating } from '../entities/rating';
import { Response, Request, NextFunction } from 'express';

export default {
  async getRatings(req: Request, res: Response, next: NextFunction) {
    try {
      const ratings = await getRepository(Rating).find();
      res.status(200).send(ratings);
    } catch (e) {
      next(e);
    }
  },
  async getRating(req: Request, res: Response, next: NextFunction) {
    try {
      const rating = await getRepository(Rating).findOneOrFail(req.params.id);
      res.status(200).send(rating);
    } catch (e) {
      next(e);
    }
  },
  async postRating(req: Request, res: Response, next: NextFunction) {
    try {
      const rating = await getRepository(Rating).create(req.body);
      const response = await getRepository(Rating).save(rating);
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  },
  async removeRating(req: Request, res: Response, next: NextFunction) {
    try {
      await getRepository(Rating).delete(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  async updateRating(req: Request, res: Response, next: NextFunction) {
    try {
      const rating = await getRepository(Rating).update(
        req.params.id,
        req.body
      );
      res.status(200).send(rating);
    } catch (e) {
      next(e);
    }
  }
};
