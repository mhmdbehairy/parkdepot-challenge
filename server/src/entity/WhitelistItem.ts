import { Field, ObjectType, Int } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@ObjectType()
@Entity('WhiteListItems')
export class WhiteListItem extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  lisencePlate: string;

  @Field()
  @Column('text')
  fromTime: string;

  @Field()
  @Column('text')
  toTime: string;
}
