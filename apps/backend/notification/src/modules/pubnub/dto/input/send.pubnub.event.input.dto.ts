import { IsNotEmpty, IsString, MaxLength, IsObject } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class SendPubNubEventInputDTO {
  @Field()
  @IsObject()
  @ApiProperty()
  @IsNotEmpty()
  message: object;

  @Field()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  channel: string;
}
