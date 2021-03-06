import express, { NextFunction, Request, Response } from 'express';

import { ServerRoute } from '../../../../../types/Server';
import { StatusCodes } from 'http-status-codes';

export default class UtilRouter {
  private router: express.Router;

  public constructor() {
    this.router = express.Router();
  }

  public buildRoutes(): express.Router {
    this.buildRoutePing();
    return this.router;
  }

  protected buildRoutePing(): void {
    this.router.get(`/${ServerRoute.REST_PING}`, (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(StatusCodes.OK);
      next();
    });
  }
}
