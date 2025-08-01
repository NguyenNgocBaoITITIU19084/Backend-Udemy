import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Interceptor(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(data => {
           return plainToClass(this.dto, data, {
            excludeExtraneousValues: true,
        })
      }))
  }
}