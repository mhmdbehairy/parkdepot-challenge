import {
  Arg,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { isAuth } from '../isAuth';
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
  @Query(() => [WhiteListItem])
  whitelistitems() {
    return WhiteListItem.find();
  }

  @Mutation(() => CreateResponse)
  @UseMiddleware(isAuth)
  async deleteItem(@Arg('id', () => Int) id: number): Promise<CreateResponse> {
    await WhiteListItem.delete(id);
    return {
      status: true,
      message: 'Item deleted successfully!',
    };
  }

  @Mutation(() => CreateResponse)
  @UseMiddleware(isAuth)
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
