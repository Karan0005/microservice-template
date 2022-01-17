import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class DeleteDemoInputDTO {
  @Field()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
