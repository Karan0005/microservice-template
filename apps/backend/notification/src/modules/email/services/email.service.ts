/* eslint-disable no-console */
import { HttpStatus, Injectable } from '@nestjs/common';
import { SendEmailInputDTO } from '../dto/input';
import { IEmailService } from '../interfaces';
import { ConfigService } from '@nestjs/config';
import { IObjectKeyValue } from '@corporate/utilities';
import { MailTemplate } from '../constants';
import { accountActivationTemplate } from '../templates';
import sendGrid from '@sendgrid/mail';

@Injectable()
export class EmailService implements IEmailService {
  private verifiedSender: string;

  constructor(private config: ConfigService) {
    this.verifiedSender = this.config.get('sendGrid.verifiedSender') || '';
    sendGrid.setApiKey(this.config.get('sendGrid.apiKey') || '');
  }

  async send(input: SendEmailInputDTO): Promise<boolean> {
    const message = {
      to: input.mailTo,
      from: this.verifiedSender,
      subject: input.subject,
      text: input.text,
      html: input.template ? this.getMailTemplate(input.template, input.params || {}) : ''
    };

    const response = await sendGrid.send(message);
    if (response[0].statusCode === HttpStatus.ACCEPTED) {
      return true;
    } else {
      return false;
    }
  }

  private getMailTemplate(templateName: string, params: IObjectKeyValue): string {
    if (templateName === MailTemplate.AccountActivation) {
      return accountActivationTemplate(params);
    }
    return 'Invalid Mail Template';
  }
}
