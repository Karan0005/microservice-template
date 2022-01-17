import { APISuccessResponse, IBaseResponse, SwaggerMessage } from '@corporate/utilities';
import { ApiProperty } from '@nestjs/swagger';
import { DemoEntity } from '../domain';

export class GetUserResponse extends APISuccessResponse implements IBaseResponse {
  @ApiProperty({
    example: {
      userId: '61c5f4625b682e34cc5e34d9',
      firstName: 'Karan',
      lastName: 'Gupta',
      email: 'karan.gupta1111@gmail.com',
      createdDateTime: '2021-12-24T16:25:06.282Z',
      modifiedDateTime: '2021-12-24T16:25:06.282Z'
    },
    description: SwaggerMessage.Property.Description.Data
  })
  data: DemoEntity;
}

export class CreateUserResponse extends APISuccessResponse implements IBaseResponse {
  @ApiProperty({
    example: {
      firstName: 'Karan',
      lastName: 'Gupta',
      email: 'karan.gupta1111@gmail.com',
      createdDateTime: '2021-12-24T16:25:06.282Z',
      modifiedDateTime: '2021-12-24T16:25:06.282Z',
      userId: '61c5f4625b682e34cc5e34d9'
    },
    description: SwaggerMessage.Property.Description.Data
  })
  data: DemoEntity;
}

export class UpdateUserResponse extends APISuccessResponse implements IBaseResponse {
  @ApiProperty({
    example: {
      userId: '61c5c6f99d6bf64d3c7394e3',
      firstName: 'Karan112323233ww',
      lastName: 'Gupta',
      email: 'karan.guptwa1se121231@gmail.com',
      createdDateTime: '2021-12-24T13:11:21.982Z',
      modifiedDateTime: '2021-12-24T13:17:59.381Z'
    },
    description: SwaggerMessage.Property.Description.Data
  })
  data: DemoEntity;
}

export class DeleteUserResponse extends APISuccessResponse implements IBaseResponse {
  @ApiProperty({
    example: {},
    description: SwaggerMessage.Property.Description.Data
  })
  data: Record<string, never>;
}
