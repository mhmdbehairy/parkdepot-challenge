import { Field, ObjectType, ID } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from 'typeorm';

@ObjectType()
@Entity('WhiteListItems')
@Unique(['lisencePlate'])
export class WhiteListItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  lisencePlate: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  fromTime: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  toTime: string;
}
