'use strict'

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    // Check if user is authenticated
    if (session && session.userId) {
      return true; // User is authenticated
    }

    // If not authenticated, you can throw an exception or redirect
    // For example, throw new UnauthorizedException();
    return false; // User is not authenticated
  }
}