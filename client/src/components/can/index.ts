import { useSelector } from 'react-redux';
import { selectUser } from 'components/auth-slice';

const check = (permissions: [string], action: string) => {
  if (!permissions || !permissions.length) {
    return false;
  }
  return permissions.some((permission) => permission === action);
};

// handling cases when passed components are functions or virtual DOMs
function unwrap(fn: Function) {
  return typeof fn === 'function' ? fn() : fn;
}

interface CanProps {
  perform: string;
  yes: any;
  no: any;
}

const Can = ({ perform, yes, no }: CanProps) => {
  const user = useSelector(selectUser);

  return check(user.permissions, perform) ? unwrap(yes) : unwrap(no);
};

Can.defaultProps = {
  yes: () => null,
  no: () => null,
};

export default Can;
