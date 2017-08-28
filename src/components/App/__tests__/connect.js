import * as connect from '../connect';
import * as transactionsActions from '../../../actions/transactions';
import * as usersActions from '../../../actions/users';
import * as userActions from '../../../actions/user';


jest.mock('../../../actions/users', () => ({
  getUsers: jest.fn(arg => arg),
}));

jest.mock('../../../actions/user', () => ({
  userInitialize: jest.fn(arg => arg),
  logout: jest.fn(arg => arg),
}));

jest.mock('../../../actions/transactions', () => ({
  getTransactions: jest.fn(arg => arg),
}));

const mockState = {
  user: [
    {
      name: 'Ivan',
      surname: 'Ivanov',
      id: 1,
    },
  ],
  fetching: false,
};

const mockDispatch = 'dispatch';

describe('Test connect for <App>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('mapStateToProps should return proper object with data from mockState', () => {
    expect(connect.mapStateToProps(mockState)).toEqual({
      user: mockState.user,
      isFetching: mockState.fetching,
    });
  });

  it('mapDispatchToProps should call getTransactions, getUsers, logout, userInitialize with mockDispatch', () => {
    connect.mapDispatchToProps(mockDispatch);
    expect(transactionsActions.getTransactions).toBeCalledWith(mockDispatch);
    expect(usersActions.getUsers).toBeCalledWith(mockDispatch);
    expect(userActions.logout).toBeCalledWith(mockDispatch);
    expect(userActions.userInitialize).toBeCalledWith(mockDispatch);
  });

  it('mapDispatchToProps should return proper object with result of calling addTransaction', () => {
    expect(connect.mapDispatchToProps(mockDispatch)).toEqual({
      getTransactions: mockDispatch,
      getUsers: mockDispatch,
      logout: mockDispatch,
      userInitialize: mockDispatch,
    });
  });
});
