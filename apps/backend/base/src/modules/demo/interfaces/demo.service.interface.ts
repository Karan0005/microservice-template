import { DeleteResult, UpdateResult } from 'typeorm';
import { DemoEntity } from '../domain';
import { GetDemoInputDTO, CreateDemoInputDTO, UpdateDemoInputDTO, DeleteDemoInputDTO } from '../dto/input';

export interface IDemoService {
  find(params: GetDemoInputDTO): Promise<DemoEntity | undefined>;
  create(params: CreateDemoInputDTO): Promise<DemoEntity>;
  update(params: UpdateDemoInputDTO): Promise<UpdateResult>;
  delete(user: DeleteDemoInputDTO): Promise<DeleteResult>;
}
