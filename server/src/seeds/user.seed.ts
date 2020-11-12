export const UserSeed = [
  {
    email: 'manager@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    password: '123456',
    permissions: ['CREATE_ITEM', 'UPDATE_ITEM', 'DELETE_ITEM', 'VIEW_ITEMS'],
  },
  {
    email: 'employee@gmail.com',
    firstName: 'Jane',
    lastName: 'Doe',
    password: '123456',
    permissions: ['UPDATE_ITEM', 'VIEW_ITEMS'],
  },
  {
    email: 'visitor@gmail.com',
    firstName: 'Leon',
    lastName: 'Cooper',
    password: '123456',
    permissions: ['VIEW_ITEMS'],
  },
];
