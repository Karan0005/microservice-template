import { ApiProperty } from '@nestjs/swagger';
import { SwaggerMessage } from '../constants';
import { IBaseResponse } from '../interfaces';
import { APISuccessResponse } from './api.success.response';

export class HealthCheckSuccessResponse extends APISuccessResponse implements IBaseResponse {
  @ApiProperty({
    example: {
      "status": "ok",
      "info": {
        "DAPR": {
          "status": "up"
        },
        "HEAP Memory": {
          "status": "up"
        },
        "RSS Memory": {
          "status": "up"
        },
        "DISK Health": {
          "status": "up"
        }
      },
      "error": {},
      "details": {
        "DAPR": {
          "status": "up"
        },
        "HEAP Memory": {
          "status": "up"
        },
        "RSS Memory": {
          "status": "up"
        },
        "DISK Health": {
          "status": "up"
        }
      }
    },
    description: SwaggerMessage.Property.Description.Data
  })
  data: unknown;
}
