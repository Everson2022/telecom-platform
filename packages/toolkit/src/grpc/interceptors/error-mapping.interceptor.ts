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

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof GrpcError) {
          return throwError(() => error);
        }

        const grpcError = this.mapToGrpcError(error);
        this.logger.error(`Mapped error to gRPC status ${grpcError.code}: ${error.message}`);
        return throwError(() => grpcError);
      }),
    );
  }

  private mapToGrpcError(error: any): GrpcError {
    if (error.code === 'P2025') {
      return new GrpcError(GrpcStatus.NOT_FOUND, 'Resource not found');
    }

    if (error.code === 'P2002') {
      return new GrpcError(GrpcStatus.ALREADY_EXISTS, 'Resource already exists');
    }

    if (error.name === 'ValidationError' || error.status === 400) {
      return new GrpcError(GrpcStatus.INVALID_ARGUMENT, error.message);
    }

    if (error.name === 'NotFoundException' || error.status === 404) {
      return new GrpcError(GrpcStatus.NOT_FOUND, error.message);
    }

    if (error.name === 'UnauthorizedException' || error.status === 401) {
      return new GrpcError(GrpcStatus.UNAUTHENTICATED, error.message);
    }

    if (error.name === 'ForbiddenException' || error.status === 403) {
      return new GrpcError(GrpcStatus.PERMISSION_DENIED, error.message);
    }

    return new GrpcError(GrpcStatus.INTERNAL, 'Internal server error');
  }
}
