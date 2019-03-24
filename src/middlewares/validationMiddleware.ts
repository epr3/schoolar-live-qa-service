import { UNPROCESSABLE_ENTITY } from '../utils/errors';
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'yup';

export default (schema: Schema<any>) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (e) {
    next(UNPROCESSABLE_ENTITY(e.message));
  }
};
