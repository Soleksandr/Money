import reducer from '../../reducers/transactions';
import * as types from '../../constants/';

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

const actionCretor = (p, t) => ({
  payload: p,
  type: t,
});

describe('transactions reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty array', () => {
    const action = actionCretor(null, {});
    expect(reducer(undefined, action)).toEqual([]);
  });

  it('should handle GET_TRANSACTIONS', () => {
    const action = actionCretor(mockTransactions, types.GET_TRANSACTIONS);
    expect(reducer(undefined, action))
      .toEqual(mockTransactions);
  });

  it('should handle CREATE_TRANSACTION', () => {
    const action = actionCretor(mockTransaction, types.CREATE_TRANSACTION);
    expect(reducer(mockTransactions, action)).toContain(mockTransaction);
  });
});
