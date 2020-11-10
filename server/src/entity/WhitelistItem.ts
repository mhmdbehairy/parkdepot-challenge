import { Field, ObjectType, ID } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@ObjectType()
@Entity('WhiteListItems')
export class WhiteListItem extends BaseEntity {
  @Field(() => ID)
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
