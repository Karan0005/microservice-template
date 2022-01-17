import { Response, Request } from 'express';

export interface IPubSubEmailConsumer {
  create(request: Request, response?: Response): void;
}
