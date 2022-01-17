import { SendPubNubEventInputDTO } from '../dto/input';

export interface IPubNubController {
  publish(mail: SendPubNubEventInputDTO): Promise<void>;
}
