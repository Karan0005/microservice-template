import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IDemoResolver, IDemoService } from './interfaces';
import { DemoEntity } from './domain';
import { Type } from '@corporate/utilities';
import { GetDemoInputDTO, CreateDemoInputDTO, UpdateDemoInputDTO, DeleteDemoInputDTO } from './dto/input';

@Resolver('Demo')
export class DemoResolver implements IDemoResolver {
  constructor(@Inject(Type.DemoService) private demoService: IDemoService) {}

  @Query(() => DemoEntity)
  async find(@Args('params') params: GetDemoInputDTO): Promise<DemoEntity | undefined> {
    try {
      const response = await this.demoService.find({ userId: params.userId });
      if (response) {
        return response;
      }
      throw new NotFoundException();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Mutation(() => DemoEntity)
  async create(@Args('params') params: CreateDemoInputDTO): Promise<DemoEntity> {
    try {
      return await this.demoService.create(params);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Mutation(() => DemoEntity)
  async update(@Args('params') params: UpdateDemoInputDTO): Promise<DemoEntity> {
    try {
      const response = await this.demoService.update(params);
      if (response.affected && response.affected > 0) {
        const userDetails = await this.demoService.find({ userId: params.userId });
        if (userDetails) {
          return userDetails;
        }
      }
      throw new NotFoundException();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Mutation(() => Boolean)
  async delete(@Args('params') params: DeleteDemoInputDTO): Promise<boolean> {
    try {
      const response = await this.demoService.delete({ userId: params.userId });
      if (!response || response.affected === 0) {
        throw new NotFoundException();
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
