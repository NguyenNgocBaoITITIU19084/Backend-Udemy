import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
@Injectable()
// This interceptor can be used to manipulate the request or response data
export class UserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const {userId} = request.session || {};

    if(userId) {
      const user = await this.usersService.findOne(userId);
      request.user = user[0].id; // Assuming findOne returns an array
    }

    return next.handle();
  }

}