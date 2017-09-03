import * as connect from '../connect';
import * as transactionsActions from '../../../actions/transactions';

jest.mock('../../../actions/transactions', () => ({
  getTransactions: jest.fn(arg => arg),
}));


const mockUser1 = {
  username: 'ivan',
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

const mockUser2 = {
  username: 'petr',
  name: 'Petr',
  surname: 'Petrov',
  id: 2,
};

const mockState = {
  transactions: [
    {
      title: 'test1',
      cost: '1',
      payer: mockUser1,
      participants: [mockUser1, mockUser2],
      id: 1,
    },
    {
      title: 'test2',
      cost: '2',
      payer: mockUser2,
      participants: [mockUser1, mockUser2],
      id: 2,
    },
  ],
};

const mockDispatch = 'dispatch';

describe('Test connect for <Transactions>', () => {
  it('mapStateToProps should return proper object with data from mockState', () => {
    expect(connect.mapStateToProps(mockState)).toEqual({
      transactions: mockState.transactions,
    });
  });

  it('mapDispatchToProps should call getTransactions, getUsers, logout, userInitialize with mockDispatch', () => {
    connect.mapDispatchToProps(mockDispatch);
    expect(transactionsActions.getTransactions).toBeCalledWith(mockDispatch);
  });

  it('mapDispatchToProps should return proper object with result of calling addTransaction', () => {
    expect(connect.mapDispatchToProps(mockDispatch)).toEqual({
      getTransactions: mockDispatch,
    });
  });
});
