import { CreateDemoInputDTO } from '../../demo/dto/input';

export interface IPubSubNotificationEvent {
  create(params: CreateDemoInputDTO): Promise<void>;
}
