import * as actions from '../users';
import { fetchQuery } from '../../apiCalls/graphql';
import * as constants from '../../constants';

const mockDispatch = jest.fn();

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
  id: 1,
  name: 'Evgeny',
  surname: 'Onegin',
};


jest.mock('../../apiCalls/graphql', () => ({
  fetchQuery: jest.fn(() => Promise.resolve({
    data: {
      getUsers: mockUsers,
      createUser: mockUser,
    },
  })),
}));

describe('Test users actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getUsers should calls fetchQuery with proper arguments', () => {
    actions.getUsers(mockDispatch)();
    expect(fetchQuery).toBeCalledWith(constants.QUERY_USERS);
  });

  it('getUsres should calls mockDispatch with proper arguments', () => {
    actions.getUsers(mockDispatch)()
      .then(() => expect(mockDispatch).toBeCalledWith({
        type: constants.GET_USERS,
        payload: mockUsers,
      }));
  });

  it('createUser should calls fetchQuery with proper arguments', () => {
    actions.createUser(mockDispatch)(mockUser);
    expect(fetchQuery).toBeCalledWith(constants.MUTATION_USERS, mockUser);
  });

  it('createUser should calls mockDispatch 1 times', () => {
    actions.createUser(mockDispatch)(mockUser)
    .then(() => expect(mockDispatch).toHaveBeenCalledTimes(1));
  });

  it('createUser should calls mockDispatch with proper arguments', () => {
    actions.createUser(mockDispatch)()
      .then(() => {
        expect(mockDispatch).toBeCalledWith({
          type: constants.CREATE_USER,
          payload: mockUser,
        });
      });
  });
});
