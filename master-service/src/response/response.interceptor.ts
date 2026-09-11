import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseBuilder } from './response.builder';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        if (data?.success !== undefined) {
          return data;
        }

        return ResponseBuilder.success(data, {
          statusCode: context.switchToHttp().getResponse().statusCode,
          path: request.url,
          method: request.method,
          requestId: request.headers['x-request-id'] ?? '',
        });
      }),
    );
  }
}