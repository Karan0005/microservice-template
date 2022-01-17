import { IPubSubEvent, PubSubEvents, Type } from '@corporate/utilities';
import { Controller, Inject, Logger, LoggerService, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { IEmailService } from '../../../email/interfaces';
import { SendEmailInputDTO } from '../../../email/dto/input';
import { MailSubject, MailTemplate } from '../../../email/constants';
import { IPubSubEmailConsumer } from '../../interfaces';

@Controller('')
export class PubSubEmailConsumer implements IPubSubEmailConsumer {
  constructor(@Inject(Logger) private readonly logger: LoggerService, @Inject(Type.EmailService) private emailService: IEmailService) {}

  @Post('/email')
  async create(@Req() request: Request, @Res() response: Response) {
    this.logger.log('Data Consumed on Email Consumer of Notification Microservice');
    const pubSubEvent: IPubSubEvent = request.body.data;

    if (pubSubEvent.event === PubSubEvents.CreateDemoEvent) {
      const parsedData = JSON.parse(pubSubEvent.data);
      const message: SendEmailInputDTO = {
        mailTo: parsedData.email,
        subject: MailSubject.AccountActivation,
        template: MailTemplate.AccountActivation,
        params: {
          firstName: parsedData.firstName,
          lastName: parsedData.lastName
        }
      };
      await this.emailService.send(message);
      this.logger.log('Mail Sent Successfully To User');
    }

    response.sendStatus(200);
  }
}
