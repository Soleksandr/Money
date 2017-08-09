import * as connect from '../connect';
import * as transactionsActions from '../../../actions/transactions';
import * as usersActions from '../../../actions/users';


jest.mock('../../../actions/users', () => ({
  getUsers: jest.fn(arg => arg),
}));

jest.mock('../../../actions/transactions', () => ({
  getTransactions: jest.fn(arg => arg),
}));

const mockState = {
  users: [
    {
      name: 'Ivan',
      surname: 'Ivanov',
      id: 1,
    },
  ],
  transactions: [
    {
      title: 'test',
      cost: 1,
      payerId: 1,
      participantsId: [1, 2],
      id: 1,
    },
  ],
};

const mockDispatch = 'dispatch';

describe('Test connect for <App>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('mapStateToProps should return proper object with data from mockState', () => {
    expect(connect.mapStateToProps(mockState)).toEqual(
      {
        users: mockState.users,
        transactions: mockState.transactions,
      },
    );
  });

  it('mapDispatchToProps should call getTransactions and getUsers with mockDispatch', () => {
    connect.mapDispatchToProps(mockDispatch);
    expect(transactionsActions.getTransactions).toBeCalledWith(mockDispatch);
    expect(usersActions.getUsers).toBeCalledWith(mockDispatch);
  });

  it('mapDispatchToProps should return proper object with result of calling addTransaction', () => {
    expect(connect.mapDispatchToProps(mockDispatch)).toEqual(
      {
        getTransactions: mockDispatch,
        getUsers: mockDispatch,
      });
  });
});
