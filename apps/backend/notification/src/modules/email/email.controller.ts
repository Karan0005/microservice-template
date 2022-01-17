import { SwaggerMessage, Type } from '@corporate/utilities';
import { Controller, Inject, BadRequestException, Body, Post, InternalServerErrorException } from '@nestjs/common';
import { IEmailController, IEmailService } from './interfaces';
import { SendEmailInputDTO } from './dto/input';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendEmailResponse } from './swagger/email.props.swagger';

@Controller('email')
@ApiTags('Email')
export class EmailController implements IEmailController {
  constructor(@Inject(Type.EmailService) private emailService: IEmailService) {}

  @Post()
  @ApiOperation({ summary: 'Send Email' })
  @ApiResponse({
    status: SwaggerMessage.Response.OK.Status,
    description: SwaggerMessage.Response.OK.Description,
    type: SendEmailResponse
  })
  async send(@Body() param: SendEmailInputDTO): Promise<void> {
    try {
      const response = await this.emailService.send(param);
      if (!response) {
        throw new BadRequestException();
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
