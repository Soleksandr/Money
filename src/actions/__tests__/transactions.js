import * as actions from '../transactions';
import { fetchQuery } from '../../apiCalls/graphql';
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

jest.mock('../../apiCalls/graphql', () => ({
  fetchQuery: jest.fn(() => Promise.resolve({
    data: {
      getTransactions: mockTransactions,
      createTransaction: mockTransaction,
    },
  })),
}));


describe('Test transactions actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getTransactions should calls fetchQuery with proper argument', () => {
    actions.getTransactions(mockDispatch)();
    expect(fetchQuery).toBeCalledWith(constants.QUERY_TRANSACTIONS);
  });

  it('getTransactions should calls mockDispatch with proper arguments', () => {
    actions.getTransactions(mockDispatch)()
      .then(() => expect(mockDispatch).toBeCalledWith({
        type: constants.GET_TRANSACTIONS,
        payload: mockTransactions,
      }));
  });

  it('createTransaction should calls fetchQuery with proper argument', () => {
    actions.createTransaction(mockDispatch)(mockTransaction);
    expect(fetchQuery).toBeCalledWith(constants.MUTATION_TRANSACTIONS, mockTransaction);
  });

  it('createTransaction should calls mockDispatch with proper arguments', () => {
    actions.createTransaction(mockDispatch)()
      .then(() => expect(mockDispatch).toBeCalledWith({
        type: constants.CREATE_TRANSACTION,
        payload: mockTransaction,
      }));
  });
});
