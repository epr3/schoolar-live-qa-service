import { getRepository } from 'typeorm';
import { Question } from '../entities/question';
import { Response, Request, NextFunction } from 'express';

export default {
  async getQuestions(req: Request, res: Response, next: NextFunction) {
    try {
      const questions = await getRepository(Question).find();
      res.status(200).send(questions);
    } catch (e) {
      next(e);
    }
  },
  async getQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const question = await getRepository(Question).findOneOrFail(
        req.params.id
      );
      res.status(200).send(question);
    } catch (e) {
      next(e);
    }
  },
  async postQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const question = await getRepository(Question).create(req.body);
      const response = await getRepository(Question).save(question);
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  },
  async removeQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      await getRepository(Question).delete(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  async updateQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const question = await getRepository(Question).update(
        req.params.id,
        req.body
      );
      res.status(200).send(question);
    } catch (e) {
      next(e);
    }
  }
};
