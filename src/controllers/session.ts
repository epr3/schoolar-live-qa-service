import { getRepository } from 'typeorm';
import { Session } from '../entities/session';
import { Response, Request, NextFunction } from 'express';

export default {
  async getSessions(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await getRepository(Session).find();
      res.status(200).send(sessions);
    } catch (e) {
      next(e);
    }
  },
  async getSession(req: Request, res: Response, next: NextFunction) {
    try {
      const session = await getRepository(Session).findOneOrFail(req.params.id);
      res.status(200).send(session);
    } catch (e) {
      next(e);
    }
  },
  async postSession(req: Request, res: Response, next: NextFunction) {
    try {
      const session = await getRepository(Session).create(req.body);
      const response = await getRepository(Session).save(session);
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  },
  async removeSession(req: Request, res: Response, next: NextFunction) {
    try {
      await getRepository(Session).delete(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  async updateSession(req: Request, res: Response, next: NextFunction) {
    try {
      const session = await getRepository(Session).update(
        req.params.id,
        req.body
      );
      res.status(200).send(session);
    } catch (e) {
      next(e);
    }
  }
};
