
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DateTransformProcessor } from '../processors';

@InputType()
export class UpdateEntityAudit {
  @Field()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Transform(DateTransformProcessor)
  modifiedAt: string = new Date().toISOString();

  @Field()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  modifiedBy: string;
}
