import { getRepository } from 'typeorm';
import { Answer } from '../entities/answer';
import { Response, Request, NextFunction } from 'express';

export default {
  async getAnswers(req: Request, res: Response, next: NextFunction) {
    try {
      const answers = await getRepository(Answer).find();
      res.status(200).send(answers);
    } catch (e) {
      next(e);
    }
  },
  async getAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const answer = await getRepository(Answer).findOneOrFail(req.params.id);
      res.status(200).send(answer);
    } catch (e) {
      next(e);
    }
  },
  async postAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const answer = await getRepository(Answer).create(req.body);
      const response = await getRepository(Answer).save(answer);
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  },
  async removeAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      await getRepository(Answer).delete(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  async updateAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const answer = await getRepository(Answer).update(
        req.params.id,
        req.body
      );
      res.status(200).send(answer);
    } catch (e) {
      next(e);
    }
  }
};
