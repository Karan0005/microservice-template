import { Response } from 'express';

export interface IPubSubConfigConsumer {
  subscribeKafkaTopics(response: Response): void;
  daprConfig(): void;
}
