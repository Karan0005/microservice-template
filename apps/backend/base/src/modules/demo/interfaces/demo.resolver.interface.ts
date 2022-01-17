import { DemoEntity } from '../domain';
import { GetDemoInputDTO, CreateDemoInputDTO, UpdateDemoInputDTO, DeleteDemoInputDTO } from '../dto/input';

export interface IDemoResolver {
  find(params: GetDemoInputDTO): Promise<DemoEntity | undefined>;
  create(params: CreateDemoInputDTO): Promise<DemoEntity>;
  update(params: UpdateDemoInputDTO): Promise<DemoEntity>;
  delete(params: DeleteDemoInputDTO): Promise<boolean>;
}
