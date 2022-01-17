import { SendEmailInputDTO } from '../dto/input';

export interface IEmailService {
  send(mail: SendEmailInputDTO): Promise<boolean>;
}
