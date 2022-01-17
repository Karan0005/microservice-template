import { APISuccessResponse, IBaseResponse, SwaggerMessage } from '@corporate/utilities';
import { ApiProperty } from '@nestjs/swagger';

export class SendPubNubEventResponse extends APISuccessResponse implements IBaseResponse {
  @ApiProperty({
    example: {},
    description: SwaggerMessage.Property.Description.Data
  })
  data: Record<string, never>;
}
