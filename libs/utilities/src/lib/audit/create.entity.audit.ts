import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty  } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';
import { DateTransformProcessor } from '../processors';
import { Transform } from 'class-transformer';

@InputType()
export class CreateEntityAudit {
  @Field()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Transform(DateTransformProcessor)
  createdAt: string = new Date().toISOString();

  @Field()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  createdBy: string;
}
