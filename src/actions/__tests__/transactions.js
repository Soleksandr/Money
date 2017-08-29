import * as actions from '../transactions';
import * as apiCalls from '../../apiCalls/transactions';
import * as constants from '../../constants';

const mockDispatch = jest.fn();

const mockTransactions = [
  {
    title: 'test',
    cost: 1,
    payerId: 1,
    participantsId: [1, 2],
    id: 1,
  },
  {
    title: 'test1',
    cost: 2,
    payerId: 2,
    participantsId: [1, 2],
    id: 1,
  },
];

const mockTransaction = {
  title: 'test3',
  cost: 3,
  payerId: 3,
  participantsId: [1, 2, 3],
  id: 1,
};

jest.mock('../../apiCalls/transactions', () => ({
  getTransactions: jest.fn(() => Promise.resolve(mockTransactions)),
  createTransaction: jest.fn(() => Promise.resolve(mockTransaction)),
}));

describe('Test users actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getTransactions should calls apiCalls.getTransactions', () => {
    actions.getTransactions(mockDispatch)();
    expect(apiCalls.getTransactions).toBeCalled();
  });

  it('getTransactions should calls mockDispatch with proper arguments', () => {
    actions.getTransactions(mockDispatch)()
      .then(() => expect(mockDispatch).toBeCalledWith({
        type: constants.GET_TRANSACTIONS,
        payload: mockTransactions,
      }));
  });

  it('createTransaction should calls apiCalls.createTransaction', () => {
    actions.createTransaction(mockDispatch)(mockTransaction);
    expect(apiCalls.createTransaction).toBeCalled();
  });

  it('createTransaction should calls mockDispatch with proper arguments', () => {
    actions.createTransaction(mockDispatch)()
      .then(() => expect(mockDispatch).toBeCalledWith({
        type: constants.CREATE_TRANSACTION,
        payload: mockTransaction,
      }));
  });
});
