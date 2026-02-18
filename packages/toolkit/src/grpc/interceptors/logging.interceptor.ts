import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class GrpcLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(GrpcLoggingInterceptor.name);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler().name;
    const className = context.getClass().name;

    const startTime = Date.now();

    this.logger.debug(`gRPC call: ${className}.${handler}`);

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          this.logger.debug(`gRPC ${className}.${handler} completed in ${duration}ms`);
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.error(
            `gRPC ${className}.${handler} failed in ${duration}ms: ${error.message}`,
          );
        },
      }),
    );
  }
}
