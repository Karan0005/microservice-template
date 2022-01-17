import { SwaggerMessage, Type } from '@corporate/utilities';
import { Controller, Inject, BadRequestException, Body, Post, InternalServerErrorException } from '@nestjs/common';
import { IPubNubController, IPubNubService } from './interfaces';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendPubNubEventResponse } from './swagger';
import { SendPubNubEventInputDTO } from './dto/input';

@Controller('pubnub')
@ApiTags('PubNub')
export class PubNubController implements IPubNubController {
  constructor(@Inject(Type.PubNubService) private pubNubService: IPubNubService) {}

  @Post()
  @ApiOperation({ summary: 'Publish PubNub Event' })
  @ApiResponse({
    status: SwaggerMessage.Response.OK.Status,
    description: SwaggerMessage.Response.OK.Description,
    type: SendPubNubEventResponse
  })
  async publish(@Body() param: SendPubNubEventInputDTO): Promise<void> {
    try {
      const response = await this.pubNubService.publish(param);
      if (!response) {
        throw new BadRequestException();
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
