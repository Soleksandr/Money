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

describe('transactions reducer', () => {
  it('should return empty array', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle GET_TRANSACTIONS', () => {
    expect(reducer(mockTransactions, types.GET_TRANSACTIONS))
      .toEqual(mockTransactions);
  });

  it('should handle ADD_TRANSACTION', () => {
    const state = reducer(mockTransactions,
      { type: types.ADD_TRANSACTION, payload: mockTransaction });
    expect(state).toContain(mockTransaction);
  });
});
