import { ApiProperty } from '@nestjs/swagger';
import { BaseMessage, SwaggerMessage } from '../constants';
import { IBaseResponse } from '../interfaces';

export class APISuccessResponse implements IBaseResponse {
  @ApiProperty({ example: true, description: SwaggerMessage.Property.Description.IsSuccess })
  isSuccess: boolean;

  @ApiProperty({ example: BaseMessage.Success, description: SwaggerMessage.Property.Description.Message })
  message: string;

  data: unknown;

  @ApiProperty({ example: [], description: SwaggerMessage.Property.Description.Errors })
  errors: unknown[];
}
