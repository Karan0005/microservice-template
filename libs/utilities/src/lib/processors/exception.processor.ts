import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject, Logger, LoggerService } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { BaseMessage } from '../constants';
import { IBaseResponse } from '../interfaces';

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  constructor(@Inject(Logger) private readonly logger: LoggerService) { }

  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    let status, message, errors;
    this.logger.error(exception);

    if (gqlHost.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      if (exception instanceof HttpException) {
        status = exception.getStatus();
        message = exception.message ? exception.message : BaseMessage.Error;
        errors = [
          {
            HttpException: exception.getResponse()
          }
        ];
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = BaseMessage.Error;
        errors = [
          {
            NonHttpException: exception
          }
        ];
      }

      const res: IBaseResponse = {
        isSuccess: false,
        message: message,
        data: {},
        errors: errors
      };
      response.status(status).json(res);
    } else {
      return exception;
    }
  }
}
