import { Request, Response } from 'express';

export interface IApolloServerExpressContext {
  req: Request;
  res: Response;
}
