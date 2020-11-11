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
class CreateResponse {
  @Field()
  status: boolean;
  @Field()
  message: string;
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

  @Mutation(() => CreateResponse)
  //@UseMiddleware(isAuth)
  @Authorized('Admin', 'Manager')
  async deleteItem(@Arg('id', () => ID) id: number): Promise<CreateResponse> {
    await WhiteListItem.delete(id);
    return {
      status: true,
      message: 'Item deleted successfully!',
    };
  }

  @Mutation(() => CreateResponse)
  //@UseMiddleware(isAuth)
  @Authorized('Admin', 'Manager', 'Employee')
  async updateItem(
    @Arg('id', () => ID) id: number,
    @Arg('lisencePlate') lisencePlate: string,
    @Arg('fromTime') fromTime: string,
    @Arg('toTime') toTime: string
  ): Promise<CreateResponse> {
    const item = await WhiteListItem.findOne(id);

    if (!item) {
      return {
        status: false,
        message: 'Item not found!',
      };
    }

    await WhiteListItem.update({ id }, { lisencePlate, fromTime, toTime });

    return {
      status: true,
      message: 'Item updated successfully!',
    };
  }

  @Mutation(() => CreateResponse)
  //@UseMiddleware(isAuth)
  @Authorized('Admin', 'Manager')
  async createItem(
    @Arg('lisencePlate') lisencePlate: string,
    @Arg('fromTime') fromTime: string,
    @Arg('toTime') toTime: string
  ): Promise<CreateResponse> {
    try {
      await WhiteListItem.insert({
        lisencePlate,
        fromTime,
        toTime,
      });
    } catch (err) {
      console.log(err);
      return {
        status: false,
        message: 'Failed to create whitelist item!',
      };
    }

    return {
      status: true,
      message: 'Created whiteslist item successfully!',
    };
  }
}
