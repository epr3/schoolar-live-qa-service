import { APIError } from './../utils/errors';
import { NextFunction, Request, Response } from 'express';

export default (
  error: APIError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({ message });
};
