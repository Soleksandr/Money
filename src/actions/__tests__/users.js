import * as actions from '../users';
import * as apiCalls from '../../apiCalls/users';
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
  name: 'Evgeny',
  surname: 'Onegin',
};

jest.mock('../../apiCalls/users', () => ({
  getUsers: jest.fn(() => Promise.resolve(mockUsers)),
}));

describe('Test users actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getUsers should calls apiCalls.getUsers', () => {
    actions.getUsers(mockDispatch)();
    expect(apiCalls.getUsers).toBeCalled();
  });

  it('getUsres should calls mockDispatch with proper arguments', () => {
    actions.getUsers(mockDispatch)()
      .then(() => expect(mockDispatch).toBeCalledWith({
        type: constants.GET_USERS,
        payload: mockUsers,
      }));
  });
});
