import { Type } from '@corporate/utilities';
import { Logger, Module } from '@nestjs/common';
import { EmailService } from './services';
import { EmailController } from './email.controller';

@Module({
  controllers: [EmailController],
  providers: [
    {
      provide: Type.EmailService,
      useClass: EmailService
    },
    Logger
  ],
  exports: [
    {
      provide: Type.EmailService,
      useClass: EmailService
    }
  ]
})
export class EmailModule {}
