import { SendEmailInputDTO } from '../dto/input';

export interface IEmailController {
  send(mail: SendEmailInputDTO): Promise<void>;
}
