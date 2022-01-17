import { IsEmail, IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateDemoInputDTO {
  @Field()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @Field()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @Field()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @Field()
  @IsString()
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  modifiedBy: string;
}
