import { DemoEntity } from '../domain';
import { CreateDemoInputDTO, DeleteDemoInputDTO, GetDemoInputDTO, UpdateDemoInputDTO } from '../dto/input';

export interface IDemoController {
  find(userId: GetDemoInputDTO): Promise<DemoEntity>;
  create(params: CreateDemoInputDTO): Promise<DemoEntity>;
  update(params: UpdateDemoInputDTO): Promise<DemoEntity>;
  delete(userId: DeleteDemoInputDTO): Promise<void>;
}
