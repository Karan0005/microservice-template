import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'Demo' })
export class DemoEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  @ApiProperty()
  userId: string;

  @Field()
  @Column({ type: String, length: 50 })
  @ApiProperty()
  firstName: string;

  @Field()
  @Column({ type: String, length: 50 })
  @ApiProperty()
  lastName: string;

  @Field()
  @Column({ type: String, unique: true })
  @ApiProperty()
  email: string;

  @Field()
  @CreateDateColumn()
  @ApiProperty()
  createdDateTime: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ default: null })
  @ApiProperty()
  modifiedDateTime: Date;
}
