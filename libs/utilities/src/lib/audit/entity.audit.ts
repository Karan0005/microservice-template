import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@ObjectType()
export class EntityAudit {
  @Field(() => String)
  createdAt: string = new Date().toISOString();

  @Field(() => String)
  @ApiProperty()
  createdBy: string;

  @Field(() => String)
  modifiedAt?: string = new Date().toISOString();

  @Field(() => String)
  @ApiPropertyOptional()
  modifiedBy?: string;
}
