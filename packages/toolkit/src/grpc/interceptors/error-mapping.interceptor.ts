import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { status as GrpcStatus } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

export class GrpcError extends RpcException {
  constructor(
    public readonly code: number,
    message: string,
  ) {
    super({ code, message });
  }
}

@Injectable()
export class GrpcErrorMappingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(GrpcErrorMappingInterceptor.name);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: unknown) => {
        if (error instanceof GrpcError) {
          return throwError(() => error);
        }

        const grpcError = this.mapToGrpcError(error);
        const message = error instanceof Error ? error.message : String(error);
        this.logger.error(`Mapped error to gRPC status ${grpcError.code}: ${message}`);
        return throwError(() => grpcError);
      }),
    );
  }

  private mapToGrpcError(error: unknown): GrpcError {
    const err = error as Record<string, unknown>;
    const code = err['code'] as string | undefined;
    const name = err['name'] as string | undefined;
    const status = err['status'] as number | undefined;
    const message = (err['message'] as string | undefined) ?? 'Internal server error';

    if (code === 'P2025') {
      return new GrpcError(GrpcStatus.NOT_FOUND, 'Resource not found');
    }

    if (code === 'P2002') {
      return new GrpcError(GrpcStatus.ALREADY_EXISTS, 'Resource already exists');
    }

    if (name === 'ValidationError' || status === 400) {
      return new GrpcError(GrpcStatus.INVALID_ARGUMENT, message);
    }

    if (name === 'NotFoundException' || status === 404) {
      return new GrpcError(GrpcStatus.NOT_FOUND, message);
    }

    if (name === 'UnauthorizedException' || status === 401) {
      return new GrpcError(GrpcStatus.UNAUTHENTICATED, message);
    }

    if (name === 'ForbiddenException' || status === 403) {
      return new GrpcError(GrpcStatus.PERMISSION_DENIED, message);
    }

    return new GrpcError(GrpcStatus.INTERNAL, 'Internal server error');
  }
}
