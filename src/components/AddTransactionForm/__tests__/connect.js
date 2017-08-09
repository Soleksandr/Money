import * as connect from '../connect';
import * as transactionsActions from '../../../actions/transactions';

jest.mock('../../../actions/transactions', () => ({
  addTransaction: jest.fn(arg => arg),
}));

const mockState = {
  users: [
    {
      name: 'Ivan',
      surname: 'Ivanov',
      id: 1,
    },
  ],
};

const mockDispatch = 'dispatch';

describe('Test connect for <AddTransactionForm>', () => {
  it('mapStateToProps should return proper object with data from mockState', () => {
    expect(connect.mapStateToProps(mockState)).toEqual({ users: mockState.users });
  });

  it('mapDispatchToProps should call addTransaction with mockDispatch', () => {
    connect.mapDispatchToProps(mockDispatch);
    expect(transactionsActions.addTransaction).toBeCalledWith(mockDispatch);
  });

  it('mapDispatchToProps should return proper object with result of calling addTransaction', () => {
    expect(connect.mapDispatchToProps(mockDispatch)).toEqual({ addTransaction: mockDispatch });
  });
});
