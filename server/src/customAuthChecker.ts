import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { User } from './entity/User';
import { MyContext } from './MyContext';

export const customAuthChecker: AuthChecker<MyContext> = async (
  { context },
  roles
) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    return false;
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
    console.log(context.payload);
    const user = await User.findOneOrFail(context.payload?.userId);

    console.log(user);
    if (!user) {
      return false;
    }

    if (roles.length === 0) {
      return true;
    }

    if (roles.includes(user.role)) {
      console.log('here');
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }

  return false;
};
