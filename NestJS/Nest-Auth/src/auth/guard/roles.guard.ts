import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES } from '../enums/roles.enums';
import { ROLE_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    const { user } = context.switchToHttp().getRequest();
    
    const qualified = requiredRoles.some((role) => role === user.role);
    
    return qualified;
  }
}
