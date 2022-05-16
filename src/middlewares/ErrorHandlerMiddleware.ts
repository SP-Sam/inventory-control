import { NextFunction, Request, Response } from 'express';

const ErrorHandleMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  return res.status(500).json({ message: 'Internal error' });
};

export { ErrorHandleMiddleware };
