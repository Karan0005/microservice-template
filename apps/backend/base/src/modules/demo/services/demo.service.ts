import { Inject, Injectable } from '@nestjs/common';
import { Type } from '@corporate/utilities';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IPubSubNotificationEvent } from '../../dapr/interfaces';
import { DemoEntity } from '../domain';
import { CreateDemoInputDTO, DeleteDemoInputDTO, GetDemoInputDTO, UpdateDemoInputDTO } from '../dto/input';
import { IDemoService } from '../interfaces';
import { DemoRepository } from '../repositories';

@Injectable()
export class DemoService implements IDemoService {
  constructor(
    private demoRepository: DemoRepository,
    @Inject(Type.PubSubNotificationEvent) private pubSubNotificationEvent: IPubSubNotificationEvent
  ) {}

  async find(input: GetDemoInputDTO): Promise<DemoEntity | undefined> {
    return this.demoRepository.findOne(input.userId);
  }

  async create(input: CreateDemoInputDTO): Promise<DemoEntity> {
    const response = await this.demoRepository.save(input);
    await this.pubSubNotificationEvent.create(input);
    return response;
  }

  async update(input: UpdateDemoInputDTO): Promise<UpdateResult> {
    return this.demoRepository.update(input.userId, { modifiedDateTime: new Date(), ...input });
  }

  async delete(input: DeleteDemoInputDTO): Promise<DeleteResult> {
    return this.demoRepository.delete(input.userId);
  }
}
