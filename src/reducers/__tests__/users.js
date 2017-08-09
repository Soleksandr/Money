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

const mockUser = {
  name: 'Evgeny',
  surname: 'Onegin',
};

describe('users reducer', () => {
  it('should return empty array', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle GET_USERS', () => {
    expect(reducer(mockUsers, types.GET_USERS))
      .toEqual(mockUsers);
  });

  it('should handle ADD_USER', () => {
    const state = reducer(mockUsers,
      { type: types.ADD_USER, payload: mockUser });
    expect(state).toContain(mockUser);
  });
});
