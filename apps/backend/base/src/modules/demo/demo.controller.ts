import { SwaggerMessage, Type } from '@corporate/utilities';
import { Controller, Inject, Get, NotFoundException, Post, Body, Patch, Delete, Param, InternalServerErrorException } from '@nestjs/common';
import { DemoEntity } from './domain';
import { IDemoController, IDemoService } from './interfaces';
import { CreateDemoInputDTO, DeleteDemoInputDTO, GetDemoInputDTO, UpdateDemoInputDTO } from './dto/input';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserResponse, DeleteUserResponse, GetUserResponse, UpdateUserResponse } from './swagger';

@Controller('demo')
@ApiTags('Demo')
export class DemoController implements IDemoController {
  constructor(@Inject(Type.DemoService) private demoService: IDemoService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get User By UserId' })
  @ApiResponse({
    status: SwaggerMessage.Response.OK.Status,
    description: SwaggerMessage.Response.OK.Description,
    type: GetUserResponse
  })
  async find(@Param() param: GetDemoInputDTO): Promise<DemoEntity> {
    try {
      const response = await this.demoService.find({ userId: param.userId });
      if (response) {
        return response;
      }
      throw new NotFoundException();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: SwaggerMessage.Response.OK.Status,
    description: SwaggerMessage.Response.OK.Description,
    type: CreateUserResponse
  })
  async create(@Body() user: CreateDemoInputDTO): Promise<DemoEntity> {
    try {
      return await this.demoService.create(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Patch()
  @ApiOperation({ summary: 'Update Existing User' })
  @ApiResponse({
    status: SwaggerMessage.Response.OK.Status,
    description: SwaggerMessage.Response.OK.Description,
    type: UpdateUserResponse
  })
  async update(@Body() user: UpdateDemoInputDTO): Promise<DemoEntity> {
    try {
      const response = await this.demoService.update(user);
      if (response.affected && response.affected > 0) {
        const userDetails = await this.demoService.find({ userId: user.userId });
        if (userDetails) {
          return userDetails;
        }
      }
      throw new NotFoundException();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete Existing User' })
  @ApiResponse({
    status: SwaggerMessage.Response.OK.Status,
    description: SwaggerMessage.Response.OK.Description,
    type: DeleteUserResponse
  })
  async delete(@Param() param: DeleteDemoInputDTO): Promise<void> {
    try {
      const response = await this.demoService.delete({ userId: param.userId });
      if (!response || response.affected === 0) {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
