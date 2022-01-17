import { Type } from '@corporate/utilities';
import { Logger, Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { DemoService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoRepository } from './repositories';
import { DemoResolver } from './demo.resolver';

@Module({
  controllers: [DemoController],
  imports: [TypeOrmModule.forFeature([DemoRepository])],
  providers: [
    {
      provide: Type.DemoService,
      useClass: DemoService
    },
    Logger,
    DemoResolver
  ],
  exports: [
    DemoResolver
  ]
})
export class DemoModule {}
