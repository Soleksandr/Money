import reducer from '../../reducers/users';
import * as types from '../../constants/';

const mockUsers = [
  {
    name: 'Ivan',
    surname: 'Ivanov',
    id: 1,
  },
  {
    name: 'Petr',
    surname: 'Petrov',
    id: 2,
  },
];

const actionCretor = (p, t) => ({
  payload: p,
  type: t,
});

describe('users reducer', () => {
  it('should return empty array', () => {
    const action = actionCretor(null, {});
    expect(reducer(undefined, action)).toEqual([]);
  });

  it('should handle GET_USERS', () => {
    const action = actionCretor(mockUsers, types.GET_USERS);
    expect(reducer(undefined, action))
      .toEqual(mockUsers);
  });
});
