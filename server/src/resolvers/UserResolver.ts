import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Int,
} from 'type-graphql';
import { compare, hash } from 'bcryptjs';
import { User } from '../entity/User';
import { MyContext } from '../MyContext';
import { createAccessToken, createRefreshToken } from '../auth';
import { sendRefreshToken } from '../sendRefreshTokem';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';

@ObjectType()
class LoginResponse {
  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field()
  redirectionURL: string;

  @Field()
  accessToken: string;

  @Field(() => User, { nullable: true })
  user: User | null;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers['authorization'];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(' ')[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      context.payload = payload as any;
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1);

    return true;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '');
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    const response = {
      status: false,
      message: '',
      redirectionURL: '',
      accessToken: '',
      user: null,
    };

    if (!user) {
      response.message = 'Wrong Email!';
      return response;
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      response.message = 'Wrong password!';
      return response;
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      status: true,
      message: 'User logged in successfully!',
      redirectionURL: '/',
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('role') role: string,
    @Arg('permissions', () => [String]) permissions: string[]
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        permissions,
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }
}
