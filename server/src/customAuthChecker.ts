import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { User } from './entity/User';
import { MyContext } from './MyContext';

export const customAuthChecker: AuthChecker<MyContext> = async (
  { context },
  permissions
) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    return false;
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
    const user = await User.findOneOrFail(context.payload?.userId);

    if (!user) {
      return false;
    }

    if (permissions.length === 0) {
      return true;
    }

    if (user.permissions.includes(permissions[0])) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }

  return false;
};
