import { IsNotEmpty, IsEmail, IsString, MaxLength, IsObject, IsOptional, IsIn } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IObjectKeyValue } from '@corporate/utilities';
import { MailTemplate } from '../../constants';

@InputType()
export class SendEmailInputDTO {
  @Field()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  mailTo: string;

  @Field()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  subject: string;

  @Field()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsIn(Object.values(MailTemplate).map((x) => x))
  template?: string;

  @Field()
  @IsObject()
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  params?: IObjectKeyValue;

  @Field()
  @IsString()
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  text?: string;
}
