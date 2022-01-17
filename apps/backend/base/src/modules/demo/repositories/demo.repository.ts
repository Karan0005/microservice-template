import { EntityRepository, Repository } from 'typeorm';
import { DemoEntity } from '../domain';

@EntityRepository(DemoEntity)
export class DemoRepository extends Repository<DemoEntity> {}
