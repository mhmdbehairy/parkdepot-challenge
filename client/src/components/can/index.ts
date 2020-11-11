import React from 'react';

const check = (permissions: [string], action: string) => {
  if (!permissions || !permissions.length) {
    return false;
  }

  console.log(permissions.some((permission) => permission === action));
  return permissions.some((permission) => permission === action);
};

// handling cases when passed components are functions or virtual DOMs
function unwrap(fn: Function) {
  return typeof fn === 'function' ? fn() : fn;
}

interface CanProps {
  perform: string;
  permissions: [string];
  yes: any;
  no: any;
}

const Can = ({ perform, permissions, yes, no }: CanProps) => {
  console.log('hello');
  return check(permissions, perform) ? unwrap(yes) : unwrap(no);
};

Can.defaultProps = {
  yes: () => null,
  no: () => null,
};

export default Can;
