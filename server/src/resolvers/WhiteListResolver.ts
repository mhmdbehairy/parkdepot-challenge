import {
  Arg,
  Authorized,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { WhiteListItem } from '../entity/WhitelistItem';

@ObjectType()
class ActionResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field(() => WhiteListItem, { nullable: true })
  whitelistItem: WhiteListItem | null;
}

@Resolver()
export class WhitelistResolver {
  @Authorized()
  @Query(() => [WhiteListItem])
  whitelistitems() {
    return WhiteListItem.find();
  }

  @Query(() => WhiteListItem)
  //@UseMiddleware(isAuth)
  @Authorized('Admin', 'Manager', 'Employee')
  async getWhiteListItem(
    @Arg('id', () => ID) id: number
  ): Promise<WhiteListItem> {
    const item = await WhiteListItem.findOne(id);
    return item as any;
  }

  @Mutation(() => ActionResponse)
  //@UseMiddleware(isAuth)
  @Authorized('Admin', 'Manager')
  async deleteItem(@Arg('id', () => ID) id: number): Promise<ActionResponse> {
    await WhiteListItem.delete(id);

    return {
      status: true,
      message: 'Item deleted successfully!',
      whitelistItem: null,
    };
  }

  @Mutation(() => ActionResponse)
  //@UseMiddleware(isAuth)
  @Authorized('Admin', 'Manager', 'Employee')
  async updateItem(
    @Arg('id', () => ID) id: number,
    @Arg('lisencePlate') lisencePlate: string,
    @Arg('fromTime') fromTime: string,
    @Arg('toTime') toTime: string
  ): Promise<ActionResponse> {
    const item = await WhiteListItem.findOne(id);

    if (!item) {
      return {
        status: false,
        message: 'Item not found!',
        whitelistItem: null,
      };
    }

    const updatResult = await WhiteListItem.update(
      { id },
      { lisencePlate, fromTime, toTime }
    );
    const updatedItem = await WhiteListItem.findOne(
      updatResult.generatedMaps[0].id
    );

    return {
      status: true,
      message: 'Item updated successfully!',
      whitelistItem: updatedItem || null,
    };
  }

  @Mutation(() => ActionResponse)
  //@UseMiddleware(isAuth)
  @Authorized('Admin', 'Manager')
  async createItem(
    @Arg('lisencePlate') lisencePlate: string,
    @Arg('fromTime', { nullable: true }) fromTime: string,
    @Arg('toTime', { nullable: true }) toTime: string
  ): Promise<ActionResponse> {
    console.log(fromTime, toTime);
    if ((fromTime && !toTime) || (toTime && !fromTime)) {
      console.log('here');
      return {
        status: false,
        message: 'Pick both (from and to) time or none!',
        whitelistItem: null,
      };
    }

    let insertResult = null;
    let insertedItem = null;
    try {
      insertResult = await WhiteListItem.insert({
        lisencePlate,
        fromTime,
        toTime,
      });

      insertedItem = await WhiteListItem.findOne(
        insertResult.generatedMaps[0].id
      );
    } catch (err) {
      console.log(err);
      return {
        status: false,
        message: err.detail,
        whitelistItem: insertedItem || null,
      };
    }

    return {
      status: true,
      message: 'Created whiteslist item successfully!',
      whitelistItem: insertedItem || null,
    };
  }
}
