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
  @Authorized('VIEW_ITEMS')
  @Query(() => [WhiteListItem])
  whitelistitems() {
    return WhiteListItem.find();
  }

  @Query(() => WhiteListItem)
  //@UseMiddleware(isAuth)
  @Authorized()
  async getWhiteListItem(
    @Arg('id', () => ID) id: number
  ): Promise<WhiteListItem> {
    const item = await WhiteListItem.findOne(id);
    return item as any;
  }

  @Mutation(() => ActionResponse)
  //@UseMiddleware(isAuth)
  @Authorized('DELETE_ITEM')
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
  @Authorized('UPDATE_ITEM')
  async updateItem(
    @Arg('id', () => ID) id: number,
    @Arg('lisencePlate') lisencePlate: string,
    @Arg('fromTime', { nullable: true }) fromTime: string,
    @Arg('toTime', { nullable: true }) toTime: string
  ): Promise<ActionResponse> {
    if ((fromTime && !toTime) || (toTime && !fromTime)) {
      return {
        status: false,
        message: 'Pick both (from and to) time or none!',
        whitelistItem: null,
      };
    }

    const item = await WhiteListItem.findOne(id);

    if (!item) {
      return {
        status: false,
        message: 'Item not found!',
        whitelistItem: null,
      };
    }

    await WhiteListItem.update({ id }, { lisencePlate, fromTime, toTime });

    return {
      status: true,
      message: 'Item updated successfully!',
      whitelistItem: item || null,
    };
  }

  @Mutation(() => ActionResponse)
  //@UseMiddleware(isAuth)
  @Authorized('CREATE_ITEM')
  async createItem(
    @Arg('lisencePlate') lisencePlate: string,
    @Arg('fromTime', { nullable: true }) fromTime: string,
    @Arg('toTime', { nullable: true }) toTime: string
  ): Promise<ActionResponse> {
    if ((fromTime && !toTime) || (toTime && !fromTime)) {
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
