import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    next();
  }
}